package com.connexity.demo.packLink;

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
        System.out.println("getMapping");
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }
//
//    @GetMapping("/")
//    public List<Link> all(){
//        return repository.findAll();
//    }

    //@GetMapping("/links/{username}")
    //List<Link> all(){
    //    return repository.findAll();
    //}

    @PostMapping("/")
    ResponseEntity<?> createLink(@RequestBody Link newLink){

        if(urlRepeated(newLink.getUsername(), newLink.getUrl())) {  //url already exists
            System.out.println("url already exists");
            return new ResponseEntity<String>("URL already exists", HttpStatus.BAD_REQUEST);  //getLink(newLink.getUsername(), newLink.getUrl())
        }
        newLink.set_id(ObjectId.get());
        repository.save(newLink);
        return new ResponseEntity<Link>(newLink, HttpStatus.ACCEPTED);
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
        List<String> urlList = repository.findUrlByUsernameIgnoreCase(username);

        return urlList.contains(url);
    }

    @GetMapping("/{username}")
    List<Link> byUsername(@PathVariable(value="username") String username) {
        return repository.findAllByUsernameIgnoreCaseOrderByPriority(username);
    }

    Link getLink(String username, String url) {
        return repository.findByUsernameAndUrlIgnoreCase(username, url);
    }

    //this function returns the Link object that has url as its url
}
