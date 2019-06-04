package com.connexity.demo.packUser;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import lombok.Data;

public class User {
    @Id
    private ObjectId _id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String hash;
    private LocalDate datejoined;
    private boolean textcolor;
    private boolean buttonstyle;
    private boolean profilepic;
    private int theme;

    User(String first, String last, String username, String email, String hash){
        this.firstname = first;
        this.lastname = last;
        this.username = username;
        this.email = email;
        this.hash = hash;
        this.datejoined = LocalDate.now();
    }

    User(String first, String last, String username, String email, String hash, boolean textcolor, boolean buttonstyle, boolean profilepic, int theme){
        this.firstname = first;
        this.lastname = last;
        this.username = username;
        this.email = email;
        this.hash = hash;
        this.datejoined = LocalDate.now();
        this.textcolor = textcolor;
        this.buttonstyle = buttonstyle;
        this.profilepic = profilepic;
        this.theme = theme;
    }

    User(){
        this.firstname = "first";
        this.lastname = "last";
        this.username = "username";
        this.email = "default@gmail.com";
        this.hash = "";
        this.datejoined = LocalDate.now();
        this.textcolor = true;
        this.buttonstyle = true;
        this.profilepic = true;
        this.theme = 0;
    }

    // ObjectId needs to be converted to string
    public String get_id() {
        return _id.toHexString();
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getUsername(){
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getHash() {
        return hash;
    }

    public LocalDate getDatejoined() {
        return datejoined;
    }

    public boolean getTextcolor() {return textcolor;}

    public boolean getButtonstyle() {return buttonstyle;}

    public boolean getProfilepic() {return profilepic;}

    public int getTheme() {return theme;}

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public void setDatejoined(LocalDate datejoined) {
        this.datejoined = datejoined;
    }

    public void set_id(ObjectId _id){
        this._id = _id;
    }

    public void setTextcolor(boolean textcolor) {this.textcolor = textcolor;}

    public void setButtonstyle(boolean buttonstyle) {
        this.buttonstyle = buttonstyle;
    }

    public void setProfilepic(boolean profilepic) {
        this.profilepic = profilepic;
    }

    public void setTheme(int theme) {
        this.theme = theme;
    }
}
