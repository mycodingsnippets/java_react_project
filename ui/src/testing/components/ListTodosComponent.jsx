import React, {Component} from "react";
import TodoDataService from "../scripts/TodoDataService";
import AuthenticationService from "../scripts/AuthenticationService";
import moment from 'moment';

class ListTodosComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            todo : [],
            message: null
        };

        this.deleteTodo = this.deleteTodo.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos(){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                this.setState({
                    todo: response.data
                })
            })
            .catch()
    }

    // componentWillUnmount() {}
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return true
    // }

    deleteTodo(id){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                this.setState({
                    message: `Delete of todo ${id} Succcessful`
                });
                this.fetchTodos();
            })
    }

    updateTodo(id){
        this.props.history.push(`/todos/${id}`);
    }

    addTodo(){
        this.props.history.push(`/todos/-1`)
    }

    render() {
        return (
            <div>
                <h1>List Todo</h1>
                {this.state.message && <div>{this.state.message}</div>}
                <table>
                    <thead>
                    <tr>
                        <th>description</th>
                        <th>is completed?</th>
                        <th>target date</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.todo.map(
                            t =>
                                <tr key={t.id}>
                                    <td>{t.description}</td>
                                    <td>{t.done.toString()}</td>
                                    <td>{moment(t.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button onClick={() => this.updateTodo(t.id)}>update</button></td>
                                    <td><button onClick={() => this.deleteTodo(t.id)}>delete</button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <div>
                    <button onClick={this.addTodo}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent