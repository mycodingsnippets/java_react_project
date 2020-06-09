package com.thenerdyaditya.common.security.controller;

import com.thenerdyaditya.common.security.model.AuthenticationBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BasicAuthController {
    @GetMapping(path = "/basic-auth")
    public AuthenticationBean authenticationBean(){
        return new AuthenticationBean("You are authenticated");
    }
}
