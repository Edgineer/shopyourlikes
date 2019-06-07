package com.connexity.demo.packToken;

import org.bson.types.ObjectId;

import java.time.LocalDate;
import lombok.Data;

public class Token {

    private String username;
    private String key;
    private long expiration;


    Token(String username, String key, long expiration){
        this.username = username;
        this.key = key;
        this.expiration = expiration;
    }


    public String getUsername(){
        return username;
    }

    public String getKey() {
        return key;
    }

    public long getExpiration() {
        return expiration;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setHash(long expiration) {
        this.expiration = expiration;
    }
}
