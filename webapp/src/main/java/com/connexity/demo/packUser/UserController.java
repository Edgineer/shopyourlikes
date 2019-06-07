package com.connexity.demo.packUser;

import java.util.List;
import java.io.*;
import java.net.*;
import org.json.JSONObject;

import java.util.LinkedList;
import java.util.List;
import com.connexity.demo.packLink.Link;
import com.connexity.demo.packUser.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired //creates an instance of the LinkRepository object
    private UserRepository repository;

    //Thise is a test function, and will not be exposed when we launch
    @GetMapping("/")
    public ResponseEntity<List<User>> all(){
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }

    @PostMapping("/{instaToken}")
    ResponseEntity<?> createUser(@RequestBody User newUser, @PathVariable(value="instaToken") String instaToken){
        
        //Make sure the username doesn't already exist
        int count = repository.countByUsernameIgnoreCase(newUser.getUsername());
        if(count > 0)
            return null;

        //Grab the Instagram username using the token
        String instaUsername = "";
        String instagramUrl = "https://api.instagram.com/v1/users/self/?access_token=" + instaToken;
        try{
            String instaResponse = getRequest(instagramUrl);
            instaUsername = instaUsername(instaResponse);
        } catch (Exception e){
            e.printStackTrace();
        }

        //Check that username matches with Instagram username
        if(instaUsername.equals(newUser.getUsername()) ){

            newUser.set_id(ObjectId.get());
        
            //Hash the password
            newUser.setHash(hashPassword(newUser.getHash()));

            repository.save(newUser);
            return new ResponseEntity<User>(newUser, HttpStatus.ACCEPTED);
        }
        else{
            return null;
        }
    }
    
    //Checks if username is already in the repository
    @GetMapping("/checkUsername/{username}")
    Boolean checkUsername(@PathVariable(value="username") String username){

        int count = repository.countByUsernameIgnoreCase(username);
        if(count > 0)
            return true;
        else 
            return false;
    }

    //Checks if username and password match
    @GetMapping("/match/{username}/{password}")
    String login(@PathVariable(value="username") String username, @PathVariable(value="password") String password){

        int count = repository.countByUsernameIgnoreCase(username);
        if(count > 0){
            User user = repository.findByUsernameAndHashIgnoreCase(username, hashPassword(password));
            if(user != null){
                String token = createToken(user.getUsername());
                return token;
            }
            else 
                return "";
        }
        else 
            return "";
    }

    //Delete the authentication token from token repository
    @GetMapping("/logout/{token}")
    void logout(@PathVariable(value="token") String token){

        try{
            getRequest("http://localhost:8080/tokens/delete/" + token);
        } catch (Exception e){
            e.printStackTrace();
        }
    }


    //Checks if Instagram username matches something in our DB
    @GetMapping("/instaMatch/{instaToken}")
    String checkInstaUsername(@PathVariable(value="instaToken") String instaToken){


        String instaUsername = "";

        String instagramUrl = "https://api.instagram.com/v1/users/self/?access_token=" + instaToken;
        try{
            String instaResponse = getRequest(instagramUrl);
            instaUsername = instaUsername(instaResponse);
        } catch (Exception e){
            e.printStackTrace();
        }


            User user = repository.findByUsernameIgnoreCase(instaUsername);
            if(user != null){
                String token = createToken(user.getUsername());
                return token;
            }
            else 
                return "";
    }

    @GetMapping("/get/{username}")
    User getUsername(@PathVariable(value="username") String username){
        return repository.findByUsernameIgnoreCase(username);
    }

    //Same as above, but for the public page, so the front doesn't get info like user's password
    //Unlike the one above, this endpoint is not protected by the filter
    @GetMapping("/protected/{username}")
    User getUsernameProtected(@PathVariable(value="username") String username){
        User user = repository.findByUsernameIgnoreCase(username);
        user.setFirstname("");
        user.setLastname("");
        user.setUsername("");
        user.setEmail("");
        user.setHash("");
        return user;
    }

    @PutMapping("/settings/{id}")
    User changeUserSettings(@RequestBody User newSettings, @PathVariable(value="id") String id){
        return repository.findById(id)
                .map(user -> {
                    user.setTextcolor(newSettings.getTextcolor());
                    user.setButtonstyle(newSettings.getButtonstyle());
                    user.setProfilepic(newSettings.getProfilepic());
                    user.setTheme(newSettings.getTheme());
                    return repository.save(user);
                })
                .orElseGet(() -> {
                    return null;
                });
    }
    


    /* HELPER FUNCTIONS */
    
    private String hashPassword(String password)
    {

        String hashPlaceholder = password;
        return hashPlaceholder;
    }

    private String createToken(String username)
    {
        String tokenResponse = "";
        try{
            tokenResponse = getRequest("http://localhost:8080/tokens/create/" + username);
        } catch (Exception e){
            e.printStackTrace();
        }
        return tokenResponse;
    }

    //From https://stackoverflow.com/questions/1485708/how-do-i-do-a-http-get-in-java
    private String getRequest(String urlToRead) throws Exception {
      StringBuilder result = new StringBuilder();
      URL url = new URL(urlToRead);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");
      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line;
      while ((line = rd.readLine()) != null) {
         result.append(line);
      }
      rd.close();
      return result.toString();
   }

   private String instaUsername(String JSONString){
       JSONObject jObject = new JSONObject(JSONString);
       JSONObject dataObject = jObject.getJSONObject("data");
       String username = dataObject.getString("username");
       return username;
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
