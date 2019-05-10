package com.connexity.demo.packLink;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Link {

    private @Id @GeneratedValue Long id;
    private String username;
    private String title;
    private String url;

    Link(String username, String title, String url){
        this.username = username;
        this.title = title;
        this.url = url;
    }
    Link(){
        this.username = "username";
        this.title = "title";
        this.url = "url";
    }
}