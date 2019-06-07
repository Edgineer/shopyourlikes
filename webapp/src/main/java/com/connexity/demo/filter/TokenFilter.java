package com.connexity.demo.filter;

import java.io.IOException;
import java.io.*;
import java.net.*;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.*;

import org.springframework.stereotype.Component;


@Component
public class TokenFilter implements Filter {
   @Override
   public void destroy() {}

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain) 
      throws IOException, ServletException {

      HttpServletRequest httpRequest = (HttpServletRequest) request;

      Integer check = checkRequest(httpRequest);

      
      if(check.equals(2)){

         //Check if auth token is valid
         String token = httpRequest.getHeader("Authorization");
         String tokenChop = token.substring(1, token.length()-1); //We can't send " over http
         String tokenCheck = "";
         try{
            tokenCheck = getRequest("http://localhost:8080/tokens/check/" + tokenChop);
         } catch (Exception e){
            e.printStackTrace();
         }
      

         //If token and request are valid, route traffic
         if(tokenCheck.equals("true")){
            filterchain.doFilter(request, response);
         } else{
            //The token and request were not valid, so we don't route the request
            System.out.println("FILTER Stopping query");
         }
      } else if(check.equals(1)){
         //The token and request were not valid, so we don't route the request
         System.out.println("FILTER Stopping query");

      } else if (check.equals(0)){
         //The endpoint was not protected, so route the request
         filterchain.doFilter(request, response);
      }
   }


   @Override
   public void init(FilterConfig filterconfig) throws ServletException {}

   
   //From https://stackoverflow.com/questions/1485708/how-do-i-do-a-http-get-in-java
    private String getRequest(String urlToRead) throws Exception {
      StringBuilder result = new StringBuilder();
      URL url = new URL(urlToRead);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");
      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line;
      while ((line = rd.readLine()) != null) {
         result.append(line);
      }
      rd.close();
      return result.toString();
   }

   //If protected URI, checks that token matches request info. Fails on unprotected URIs
   private Integer checkRequest(HttpServletRequest request){
      String uri = request.getRequestURI();
      String method = request.getMethod();

      String[] uriSplit = uri.split("/");
      int length = uriSplit.length;

      if(uri.matches("^/links/.*")){
         if(method.equals("POST")){
            

            return 2;

         } else if(method.equals("PUT")){
            return 2;

         } else if (method.equals("DELETE")){
            return 2;

         } else {
            //The other links endpoints are not protected
            return 0;
         }

      } else if(uri.matches("^/users/get/.*")){
         
            String token = request.getHeader("Authorization");
            String tokenChop = token.substring(1, token.length()-1);
            String[] tokenSplit = tokenChop.split("\\.");

            if (uriSplit[3].equals(tokenSplit[0])){
               return 2;
            }
            return 0;
            

      } else if(uri.matches("^/users/settings/.*")){
         return 2;

      } else {
         //The endpoint is not protected, so fail
         return 0;
      }

   }
}
