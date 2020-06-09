import React, {Component} from "react";
import AuthenticationService from "../scripts/AuthenticationService";
import ShowInvalidCreditianls from "./ShowInvalidCreditianls";

class LoginComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            username: 'aditya',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked(){
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/welcome/${this.state.username}`)
                this.setState({
                    showSuccessMessage: true,
                    hasLoginFailed: false
                })
            })
            .catch(() => {
                this.setState({
                    showSuccessMessage: false,
                    hasLoginFailed: true
                })
            })
    }

    render() {
        return (
            <>
                <ShowInvalidCreditianls hasLoginFailed={this.state.hasLoginFailed}/>
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </>
        )
    }
}

export default LoginComponent