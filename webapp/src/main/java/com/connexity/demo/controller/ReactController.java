package com.connexity.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Locale;

@Controller
public class ReactController {
    @Autowired
    protected ViewResolver viewResolver;

    private static final String reactTemplate = "react/index.html";

    @RequestMapping(value = "/", method= RequestMethod.GET, produces="text/html")
    public void reactView(HttpServletRequest request, HttpServletResponse response) {
        renderReactHtml(request,response);
    }

    private void renderReactHtml(HttpServletRequest request, HttpServletResponse response) {
        try {
            View view = viewResolver.resolveViewName(reactTemplate, Locale.US);
            view.render(new HashMap<>(), request, response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
