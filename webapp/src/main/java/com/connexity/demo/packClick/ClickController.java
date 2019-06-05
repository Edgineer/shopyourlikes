package com.connexity.demo.packClick;

import java.util.LinkedList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;


@RestController //tells Spring this class will be requested by URL and will return data to the requester
@RequestMapping("/clicks")
public class ClickController {
    @Autowired //creates an instance of the LinkRepository object
    private ClickRepository repository;
    MongoTemplate mongoTemplate;

    //get all clicks
    @GetMapping("/")
    public ResponseEntity<List<Click>> all(){
        return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
    }

    //get all clicks for a specific link
    @GetMapping("/{linkId}")
    List<Click> byLinkId (@PathVariable(value="linkId") ObjectId linkId) {
        return repository.findAllByLinkId(linkId);
    }

    //For a certain user get a list of {city,country,clicks} for all there links
    @GetMapping("/{username}/geo")
    List<Click> findUserTopLocations (@PathVariable(value = "username") String username){
        Aggregation agg = Aggregation.newAggregation(
          project("username"),
          project("city"),
          project("countryCode"),
          group("city").count().as("clicksInCity"),
          sort(DESC,"clicksInCity")
        );

        AggregationResults<Click> res = mongoTemplate.aggregate(agg,"click",Click.class);

        //GroupOperation sumCities = group("username","city","countryCode").count().as("cityCount");
        //SortOperation sortByCount = sort(Sort.Direction.DESC,"cityCount");
        //MatchOperation filterUser = match(new Criteria("username").is(username));

        //Aggregation agg = newAggregation (sumCities, filterUser, sortByCount);
        //AggregationResults<Click> result = mongoTemplate.aggregate(agg,"click",Click.class);
        return res.getMappedResults();
    }

    @PostMapping("/")
    ResponseEntity<?> createClick (@RequestBody Click newClick){
        newClick.set_id(ObjectId.get());
        repository.save(newClick);
        return new ResponseEntity<Click>(newClick, HttpStatus.ACCEPTED);
    }
}
