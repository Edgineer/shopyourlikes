package com.connexity.demo.packUser;

import java.util.List;

import com.connexity.demo.packLink.Link;
import com.connexity.demo.packUser.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class UserController {
    @Autowired //creates an instance of the LinkRepository object
    private UserRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<User>> all(){
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/")
    ResponseEntity<?> createUser(@RequestBody User newUser){
        newUser.set_id(ObjectId.get());
        repository.save(newUser);
        return new ResponseEntity<User>(newUser, HttpStatus.ACCEPTED);
    }

}


///*
//    // Get the user when logging in
//    @GetMapping("/users/login")
//    User byEmail(@RequestBody User userlogin)
//    {
//        return repository.findAllByEmailIgnoreCase(userlogin.getEmail)
//                .map(user -> {
//                    // TODO: Insert error checking
//                    user.setFirstname(newUser.getFirstname());
//                    user.setLastname(newUser.getLastname());
//                    user.setUsername(newUser.getUsername());
//                    user.setHashed_password(newUser.getHashed_password());
//                    user.setEmail(newUser.getEmail());
//                    return repository.save(user);
//                })
//                .orElseGet(()-> {
//                    // I guess create a new user if we can't find a user with this id
//                    newUser = User();
//                    return newUser;
//                });
//    }

//
//    // update user with {id} given modified user object
//    @PutMapping("/users/{id}")
//    User replaceLink(@RequestBody User newUser, @PathVariable Long id){
//        return repository.findById(id)
//                .map(user -> {
//                    // TODO: Insert error checking
//                    user.setFirstname(newUser.getFirstname());
//                    user.setLastname(newUser.getLastname());
//                    user.setUsername(newUser.getUsername());
//                    user.setHashed_password(newUser.getHashed_password());
//                    user.setEmail(newUser.getEmail());
//                    return repository.save(user);
//                })
//                .orElseGet(()-> {
//                    // I guess create a new user if we can't find a user with this id
//                    newUser.setId(id);
//                    return repository.save(newUser);
//                });
//    }
//
//    // First check with current cookie before executing this
//    @DeleteMapping("/users/{id}")
//    void deleteLink(@PathVariable Long id){
//        repository.deleteById(id);
//    }
//}
