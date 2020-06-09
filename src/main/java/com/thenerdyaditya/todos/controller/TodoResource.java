package com.thenerdyaditya.todos.controller;


import com.thenerdyaditya.todos.model.Todo;
import com.thenerdyaditya.todos.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoResource {

    @Autowired
    private TodoService todoService;

    @GetMapping("/todos/user/{username}")
    public List<Todo> getAllTodos(@PathVariable String username){
        return todoService.findAll();
    }

    @DeleteMapping("/todos/{id}/user/{username}")
    public ResponseEntity<Void> deleteTodo(@PathVariable long id, @PathVariable String username){

        Todo todo  = todoService.deleteById(id);
        if(todo!=null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/todos/{id}/user/{username}")
    public Todo getTodo(@PathVariable long id, @PathVariable String username){
        return todoService.findById(id);
    }

    @PutMapping("/todos/{id}/user/{username}")
    public ResponseEntity<Todo> updateTodo(@PathVariable long id, @PathVariable String username, @RequestBody Todo todo){
        Todo todoUpdated = todoService.save(todo);
        return new ResponseEntity<Todo>(todo, HttpStatus.OK);
    }

    @PostMapping("/todos/user/{username}")
    public ResponseEntity<Void> saveTodo(@PathVariable String username, @RequestBody Todo todo){
        Todo todoCreated = todoService.save(todo);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/todos/{id}/user/{username}")
                .buildAndExpand(todoCreated.getId(), username)
                .toUri();

        return ResponseEntity.created(uri).build();
    }


}
