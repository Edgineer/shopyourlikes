package com.connexity.demo.packToken;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "users")
interface TokenRepository extends MongoRepository<Token, String> {
	Token findByUsernameIgnoreCase(@Param("username") String username);
	void deleteByUsername(@Param("username") String username);
}
