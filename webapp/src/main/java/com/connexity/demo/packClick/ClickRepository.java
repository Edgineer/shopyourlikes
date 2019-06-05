package com.connexity.demo.packClick;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@RepositoryRestResource (collectionResourceRel = "click", path = "clicks")
interface ClickRepository extends MongoRepository<Click, String> {
    // TODO: Queries
    List<Click> findAllByLinkId (@Param("linkId") ObjectId linkId);

    List<Click> findAllByUsername(@Param("username") String username);
    //Link findByUsernameAndUrlIgnoreCase(@Param("username") String username, @Param("url") String url);
}