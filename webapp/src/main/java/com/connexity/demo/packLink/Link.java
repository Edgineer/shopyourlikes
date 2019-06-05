package com.connexity.demo.packLink;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.util.List;
import java.util.Random;

public class Link {
    @Id
    private ObjectId _id;
    private String username;
    private String title;
    private String url;
    private int priority;
    private int clicks;

    Link(String username, String title, String url, int priority){
        this.username = username;
        this.title = title;
        this.url = url;
        this.priority = priority;
        Random rand = new Random();
        this.clicks = rand.nextInt(1500);
    }

    Link(String username, String title, String url, int priority, int clicks){
        this.username = username;
        this.title = title;
        this.url = url;
        this.priority = priority;
        this.clicks = clicks;
    }

    Link(){
        this.username = "username";
        this.title = "title";
        this.url = "url";
        this.priority = 1;
        Random rand = new Random();
        this.clicks = rand.nextInt(1500);
    }

    // ObjectId needs to be converted to string
    public String get_id() {
        return _id.toHexString();
    }
    public String getUsername(){
        return username;
    }
    public String getTitle(){
        return title;
    }
    public String getUrl(){
        return url;
    }
    public int getPriority(){
        return priority;
    }
    public int getClicks() { return clicks; }
    public void setUsername(String username){
        this.username = username;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setPriority(int priority){
        this.priority = priority;
    }
    public void setUrl(String url){
        this.url = url;
    }
    public void set_id(ObjectId _id){
        this._id = _id;
    }
    public void setClicks(int clicks) { this.clicks = clicks; }
}