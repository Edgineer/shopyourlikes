package com.connexity.demo.packLink;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Data
@Entity
public class Link {

    private @Id @GeneratedValue Long id;
    private String username;
    private String title;
    private String url;
    private int priority;

    Link(String username, String title, String url, int priority){
        this.username = username;
        this.title = title;
        this.url = url;
        this.priority = priority;
    }
    Link(){
        this.username = "username";
        this.title = "title";
        this.url = "url";
        this.priority = 1;
    }

}