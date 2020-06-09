package com.thenerdyaditya.helloworld.controller;

import com.thenerdyaditya.helloworld.model.HelloWorldBean;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloWorldController {

    @RequestMapping(method = RequestMethod.GET, path = "/hello-world")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("Hello World");
    }

    @GetMapping(path = "hello/{name}")
    public HelloWorldBean hello(@PathVariable String name){
//        throw new RuntimeException("Some Error Occured");
        return new HelloWorldBean(String.format("Hello %s", name));
    }
}
