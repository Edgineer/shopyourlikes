package com.connexity.demo.packLink;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface LinkRepository extends JpaRepository<Link, Long> {
    // TODO: Queries

    List<Link> findAllByUsernameIgnoreCase(String username);

}