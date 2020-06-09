import axios from 'axios';

class TodoDataService{

    retrieveAllTodos(name){
        return axios.get(`http://localhost:8080/todos/user/${name}`);
    }

    deleteTodo(name, id){
        return axios.delete(`http://localhost:8080/todos/${id}/user/${name}`);
    }

    retrieveTodo(name, id){
        return axios.get(`http://localhost:8080/todos/${id}/user/${name}`);
    }

    updateTodo(name, id, todo){
        return axios.put(`http://localhost:8080/todos/${id}/user/${name}`, todo);
    }

    createTodo(name, todo){
        return axios.post(`http://localhost:8080/todos/user/${name}`, todo);
    }

}

export default new TodoDataService()