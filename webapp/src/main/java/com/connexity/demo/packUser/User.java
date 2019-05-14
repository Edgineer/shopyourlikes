package com.connexity.demo.packUser;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class User {
    private @Id @GeneratedValue Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String hashed_password;
    private String email;
    private LocalDate date_joined;

    User (String firstname, String lastname, String username, String hashed_password, String email){
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username; //check it does not already exist
        this.hashed_password = hashed_password;
        this.email = email;
        this.date_joined = LocalDate.now();
    }

    User() {
        this.firstname = "firstname";
        this.lastname = "lastname";
        this.username = "username"; //check it does not already exist
        this.hashed_password = "hashed_password";
        this.email = "email";
        this.date_joined = LocalDate.now();
    }
}