package com.connexity.demo.packUser;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "users")
interface UserRepository extends MongoRepository<User, String> {

}
