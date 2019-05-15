package com.connexity.demo.packLink;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "link", path = "links")
interface LinkRepository extends MongoRepository<Link, String> {
    // TODO: Queries
    List<Link> findAllByUsernameIgnoreCaseOrderByPriority(@Param("username") String username);
}