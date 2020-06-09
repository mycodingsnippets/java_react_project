import React, {Component} from "react";
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from "formik";
import TodoDataService from "../scripts/TodoDataService";
import AuthenticationService from "../scripts/AuthenticationService";

class TodoComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        if(this.state.id === "-1")
            return;

        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            })
    }

    onSubmit(values){
        let username = AuthenticationService.getLoggedInUsername();

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            username: username
        }

        if(this.state.id === "-1"){
            TodoDataService.createTodo(username, todo)
                .then(() => {
                    this.props.history.push('/todos')
                })
        }else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => {
                    this.props.history.push('/todos')
                })
        }
    }

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = "Enter a description"
        }else if (values.description.length < 5){
            errors.description = "Enter atleast 5 characters in description"
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date"
        }

        return errors;
    }


    render() {
        let {description, targetDate} = this.state;
        let init = {
            description,
            targetDate
        };
        return (
            <div>
                <h1>Todo</h1>
                <Formik
                    initialValues={init}
                    onSubmit={this.onSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div"/>
                                <ErrorMessage name="targetDate" component="div"/>
                                <fieldset>
                                    <label>Description</label>
                                    <Field type="text" name="description"/>
                                </fieldset>
                                <fieldset>
                                    <label>Target Date</label>
                                    <Field type="date" name="targetDate"/>
                                </fieldset>
                                <button type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default TodoComponent