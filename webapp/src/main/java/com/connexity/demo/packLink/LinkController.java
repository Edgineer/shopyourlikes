package com.connexity.demo.packLink;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController //tells Spring this class will be requested by URL and will return data to the requester
@RequestMapping("/links")
public class LinkController {
    @Autowired //creates an instance of the LinkRepository object
    private LinkRepository repository;

    @GetMapping("/")
    public List<Link> all(){
        return repository.findAll();
    }

    //@GetMapping("/links/{username}")
    //List<Link> all(){
    //    return repository.findAll();
    //}

    @PostMapping("/")
    Link createLink(@RequestBody Link newLink){
        newLink.set_id(ObjectId.get());
        repository.save(newLink);
        return newLink;
    }


    @PutMapping("/{id}")
    Link replaceLink(@RequestBody Link newLink, @PathVariable String id){
        return repository.findById(id)
                .map(link -> {
                    // TODO: Insert error checking
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

    void isUnique(@RequestBody Link link) {
        //check to see if link url already exists

    }



    @GetMapping("/{username}")
    List<Link> byUsername(@PathVariable(value="username") String username) {
        return repository.findAllByUsernameIgnoreCaseOrderByPriority(username);
    }
}
