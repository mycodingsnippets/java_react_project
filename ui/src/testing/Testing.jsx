import React, { Component } from "react";
import {BrowserRouter as Router, Switch,  Route} from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import WelcomeComponent from "./components/WelcomeComponent";
import ListTodosComponent from "./components/ListTodosComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import TodoComponent from "./components/TodoComponent";
// import './styles/test.css';

class Testing extends Component{
    render() {
        return (
            <div>
                <Router>
                    <>
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent />
                    </>
                </Router>
            </div>
        )
    }
}


export default Testing