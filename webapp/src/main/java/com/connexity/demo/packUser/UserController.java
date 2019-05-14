package com.connexity.demo.packUser;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserRepository repository;

    UserController(UserRepository repository){
        this.repository = repository;
    }

    // get all user objects
    @GetMapping("/users")
    List<User> all(){
        return repository.findAll();
    }
/*
    // Get the user when logging in
    @GetMapping("/users/login")
    User byEmail(@RequestBody User userlogin)
    {
        return repository.findAllByEmailIgnoreCase(userlogin.getEmail)
                .map(user -> {
                    // TODO: Insert error checking
                    user.setFirstname(newUser.getFirstname());
                    user.setLastname(newUser.getLastname());
                    user.setUsername(newUser.getUsername());
                    user.setHashed_password(newUser.getHashed_password());
                    user.setEmail(newUser.getEmail());
                    return repository.save(user);
                })
                .orElseGet(()-> {
                    // I guess create a new user if we can't find a user with this id
                    newUser = User();
                    return newUser;
                });
    }
*/
    // create new user given new user object
    @PostMapping("/users/addnew")
    User createLink(@RequestBody User newUser){
        return repository.save(newUser);
    }

    // update user with {id} given modified user object
    @PutMapping("/users/{id}")
    User replaceLink(@RequestBody User newUser, @PathVariable Long id){
        return repository.findById(id)
                .map(user -> {
                    // TODO: Insert error checking
                    user.setFirstname(newUser.getFirstname());
                    user.setLastname(newUser.getLastname());
                    user.setUsername(newUser.getUsername());
                    user.setHashed_password(newUser.getHashed_password());
                    user.setEmail(newUser.getEmail());
                    return repository.save(user);
                })
                .orElseGet(()-> {
                    // I guess create a new user if we can't find a user with this id
                    newUser.setId(id);
                    return repository.save(newUser);
                });
    }

    // First check with current cookie before executing this
    @DeleteMapping("/users/{id}")
    void deleteLink(@PathVariable Long id){
        repository.deleteById(id);
    }
}
