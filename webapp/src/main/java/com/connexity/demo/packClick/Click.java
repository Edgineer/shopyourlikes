package com.connexity.demo.packClick;


import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Document
public class Click {
    @Id
    private ObjectId _id;
    private ObjectId linkId;
    private String username;
    private LocalDate date;
    private LocalTime time;
    private String countryCode;
    private String city;

    Click(ObjectId linkId, String username, String date, String time, String countryCode, String city) {
        this.linkId = linkId;

        this.username = username;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        formatter = formatter.withLocale(Locale.US);  // Locale specifies human language for translating, and cultural norms for lowercase/uppercase and abbreviations and such. Example: Locale.US or Locale.CANADA_FRENCH
        this.date = LocalDate.parse(date, formatter);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("H:mm");
        dtf = dtf.withLocale(Locale.US);
        this.time = LocalTime.parse(time,dtf);

        this.countryCode = countryCode;
        this.city = city;
    }

    Click(ObjectId linkId, String username, LocalDate date, LocalTime time, String countryCode, String city) {
        this.linkId = linkId;

        this.username = username;

        this.date = date;
        this.time = time;

        this.countryCode = countryCode;
        this.city = city;
    }

    Click (){

    }


    public String get_id() {
        return _id.toHexString();
    }
    public String getLinkId(){
        return linkId.toHexString();
    }
    public String getUsername() {return username;}
    public String getDate(){
        return date.toString();
    }
    public String getTime(){
        return time.toString();
    }
    public String getCountryCode() {return  countryCode;}
    public String getCity() {return city;}

    public void set_id(ObjectId _id) {this._id = _id;}
    public void setLinkId(ObjectId linkId){ this.linkId = linkId; }
    public void setUsername(String username) {this.username = username;}
    public void setDate(LocalDate date){
        this.date = date;
    }
    public void setTime(LocalTime time){
        this.time = time;
    }
    public void setCountryCode(String countryCode){
        this.countryCode = countryCode;
    }
    public void setCity(String city){
        this.city = city;
    }
}