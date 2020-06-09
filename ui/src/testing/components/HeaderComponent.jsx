import React, {Component} from "react";
import AuthenticationService from "../scripts/AuthenticationService";
import {Link} from "react-router-dom";

class HeaderComponent extends Component{
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav>
                    <div><a href="/">thenerdyaditya</a></div>
                    <ul>
                        {isUserLoggedIn && <li><Link to="/welcome/aditya">Home</Link></li>}
                        {isUserLoggedIn && <li><Link to="/todos">Todos</Link></li>}
                    </ul>
                    <ul>
                        {!isUserLoggedIn && <li><Link to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent