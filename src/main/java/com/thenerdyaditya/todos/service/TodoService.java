package com.thenerdyaditya.todos.service;

import com.thenerdyaditya.todos.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoService {

    private static List<Todo> todos = new ArrayList<>();

    private static long id = 0;

    static {
        todos.add(new Todo(++id, "aditya", "Complete Auth", new Date(), false));
        todos.add(new Todo(++id, "aditya", "Implement Microservice", new Date(), false));
        todos.add(new Todo(++id, "aditya", "Deploy to cloud", new Date(), false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo deleteById(long id){
        Todo todo = findById(id);

        if(todo==null) return null;

        if(todos.remove(todo))
            return todo;
        return null;
    }

    public Todo findById(long id){
        for(Todo todo:todos){
            if(todo.getId()==id){
                return todo;
            }
        }
        return null;
    }

    public Todo save(Todo todo){
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++id);
            todos.add(todo);
        }else{
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }
}
