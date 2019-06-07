package com.connexity.demo.packToken;

import java.util.List;
import java.io.*;
import java.net.*;
import java.util.LinkedList;
import java.util.concurrent.ThreadLocalRandom; //For random int

import org.json.JSONObject;
import com.connexity.demo.packToken.TokenRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/tokens")
public class TokenController {
    @Autowired //creates an instance of the LinkRepository object
    private TokenRepository repository;

    //This function is for testing; it returns everything in the repository
    @GetMapping("/")
    public ResponseEntity<List<Token>> all(){
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }


    @GetMapping("/create/{username}")
    String createToken(@PathVariable(value="username") String username){


        //In milliseconds, how long a token will last before expiring
        long EXP_MS = 600000000; //More than a week of ms
        long expiration = System.currentTimeMillis() + EXP_MS;

        //Generate a random key
        int randomNum = ThreadLocalRandom.current().nextInt(0, 2000000000);
        String key = String.valueOf(randomNum);

        Token newToken = new Token(username, key, expiration);
        repository.deleteByUsername(username);
        repository.save(newToken);

        return username + "." + key + "." + expiration;
    }

    @GetMapping("/delete/{token}")
    Boolean deleteToken(@PathVariable(value="token") String token){

        String[] tokenSplit = token.split("\\.");
        repository.deleteByUsername(tokenSplit[0]);
        return true;
    }

    @GetMapping("/check/{token}")
    String checkToken(@PathVariable(value="token") String token){

        String[] tokenSplit = token.split("\\.");

        //Find that user's token
        Token retToken = repository.findByUsernameIgnoreCase(tokenSplit[0]);

        if(retToken == null)
            return "false";

        //If the key of the token matches, we're good
        if(tokenSplit[1].equals(retToken.getKey()))  {
            return "true";
        } else {
            return "false";
        }
    }
  
   
}
