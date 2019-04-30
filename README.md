# Getting Started

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

# About the Project

This is a spring-boot based fatjar webapp with support for a frontend bootstrapped using node dependencies. In this case, a React based frontend example has been provided, with react-router, jest testing, and an automatically refreshing dev server.

Requirements:
Maven 3+
Java 8
Node (For running the frontend independently. It is not required to simply run the service as a whole package)

# Compiling the Backend

mvn -U clean install

# Running the Backend

cd webapp
java -jar target/{compiled-jar-name}.jar

# Running the Frontend in Development Mode

cd webapp/src/main/frontend

\# This command only needs to be executed the first time you run this project
npm install

npm start

# Running the Jest Tests

d webapp/src/main/frontend
npm test

# Adding New Node Dependencies

You can add new dependencies by modifying the webapp/src/main/frontend/package.json file manually
and adding entries to the "dependencies" object. You only need to specify the dependency name and 
version.You can also add them semi-automatically by cd-ing into the webapp/src/main/frontend
directory and running "npm add DEPENDENCY_NAME", as you would in a pure node project. However, make
sure to modify the package.json file regardless and remove the '^' from any version numbers. We
don't want npm to automatically update package versions and require us to fix version
incompatibilities that aren't our doing.
