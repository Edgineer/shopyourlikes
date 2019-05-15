//package com.connexity.demo.packUser;
//
//import java.time.LocalDate;
//import lombok.Data;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//
//@Data
//@Entity
//public class User {
//    private @Id @GeneratedValue Long id;
//    private String firstname;
//    private String lastname;
//    private String username;
//    private String hash;
//    private String email;
//    private LocalDate date_joined;
//
//    User (String firstname, String lastname, String username, String hash, String email){
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.username = username; //check it does not already exist
//        this.hash = hash;
//        this.email = email;
//        this.date_joined = LocalDate.now();
//    }
//}
