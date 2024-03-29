package com.connexity.demo.packUser;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "users")
interface UserRepository extends MongoRepository<User, String> {
	int countByUsernameIgnoreCase(@Param("username") String username);
	User findByUsernameAndHashIgnoreCase(@Param("username") String username, @Param("hash") String hash);
	User findByUsernameIgnoreCase(@Param("username") String username);
}
