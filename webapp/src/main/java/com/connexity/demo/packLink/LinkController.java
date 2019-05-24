package com.connexity.demo.packLink;

import java.util.LinkedList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController //tells Spring this class will be requested by URL and will return data to the requester
@RequestMapping("/links")
public class LinkController {
    @Autowired //creates an instance of the LinkRepository object
    private LinkRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Link>> all(){
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }


    @PostMapping("/")
    ResponseEntity<?> createLink(@RequestBody Link newLink){
        if(urlRepeated(newLink.getUsername(), newLink.getUrl())) {  //url already exists
            return new ResponseEntity<String>("URL already exists", HttpStatus.BAD_REQUEST);
        }
        else {
            newLink.set_id(ObjectId.get());
            repository.save(newLink);
            return new ResponseEntity<Link>(newLink, HttpStatus.ACCEPTED);
        }
        //return new ResponseEntity<>("WHAT THE HECK", HttpStatus.BAD_REQUEST);
    }


    @PutMapping("/{id}")
    Link replaceLink(@RequestBody Link newLink, @PathVariable String id){
        return repository.findById(id)
                .map(link -> {
                    // TODO: Ins/mattert error checking
                    link.setTitle(newLink.getTitle());
                    link.setUrl(newLink.getUrl());
                    link.setPriority(newLink.getPriority());
                    return repository.save(link);
                })
                .orElseGet(()-> {
                    // TODO: Shouldn't do anything if ID doesn't exist
                    //newLink.setId(id);
                    return repository.save(newLink);
                });
    }

    @DeleteMapping("/{id}")
    void deleteLink(@PathVariable String id){
        repository.deleteById(id);
    }


    //returns 1 if the url already exists for this username
    private boolean urlRepeated(String username, String url) {
        List<String> urlList = urls(username);
        return urlList.contains(url);
    }


    //returns a list of urls associated with username
    @GetMapping("/test/{username}")
    List<String> urls(@PathVariable(value="username") String username) {
        List<Link> links= repository.findAllByUsernameIgnoreCaseOrderByPriority(username);
        List<String> url = new LinkedList<String>();
        for(int i = 0; i < links.size(); i++)
            url.add((links.get(i)).getUrl());
        return url;
    }

    @GetMapping("/{username}")
    List<Link> byUsername(@PathVariable(value="username") String username) {
        return repository.findAllByUsernameIgnoreCaseOrderByPriority(username);
    }

}
