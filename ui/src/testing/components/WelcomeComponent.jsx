import React, {Component} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from "../scripts/HelloWorldService";

class WelcomeComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            welcomeMessage: ''
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleError(error){
        let errorMessage = '';

        if(error.message)
            errorMessage += error.message;

        if(error.response && error.response.data){
            errorMessage += error.response.data.message;
        }
        this.setState({
            welcomeMessage: errorMessage
        })
    }

    render() {
        return (
            <>
                <div>
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div>
                    Click here to get a customised welcome message.
                    <button onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
}

export default WelcomeComponent