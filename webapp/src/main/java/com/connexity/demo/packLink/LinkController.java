package com.connexity.demo.packLink;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
public class LinkController {
    private final LinkRepository repository;

    LinkController(LinkRepository repository){
        this.repository = repository;
    }

    @GetMapping("/links")
    List<Link> all(){
        return repository.findAll();
    }

    //@GetMapping("/links/{username}")
    //List<Link> all(){
    //    return repository.findAll();
    //}

    @PostMapping("links")
    Link createLink(@RequestBody Link newLink){
        return repository.save(newLink);
    }


    @PutMapping("/links/{id}")
    Link replaceLink(@RequestBody Link newLink, @PathVariable Long id){
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
                    newLink.setId(id);
                    return repository.save(newLink);
                });
    }

    @DeleteMapping("/links/{id}")
    void deleteLink(@PathVariable Long id){
        repository.deleteById(id);
    }

    void isUnique(@RequestBody Link link)
    {
        //check to see if link url already exists

    }

    @RequestMapping("/byUsername/{username}")
    List<Link> byUsername(@PathVariable(value="username") String username)
    {
        return repository.findAllByUsernameIgnoreCase(username);
    }


}
