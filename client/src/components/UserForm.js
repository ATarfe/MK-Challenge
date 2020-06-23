import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import uuid from 'react-uuid';


export class UserForm extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    state = {
        id:'',
        name: '',
        email: '',
        message: ''
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch('https://dez880womj.execute-api.us-east-2.amazonaws.com/deploy1/gateway', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
              body: JSON.stringify({
                id: uuid(),  
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
              })
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        alert("Email sent!");
                    });
                }
                else{
                    response.json().then(json => {
                        alert("Some error occured!");
                    });
                }
            });
            this.handleReset();
    }

    handleReset() {
        this.setState({id: '',
            name: '',
            email: '',
            message: ''
        });
    }
 
    render() {
        const { name, email, message } = this.state;
        return (
            <div className="page">
                <AppBar position="static" style={{marginBottom: "100px"}}>
                    <Toolbar>
                    <Typography variant="h5">
                       MK Contact Form
                    </Typography>
                    </Toolbar>  
                </AppBar>
                <br /><br />
                
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Name"
                        variant="outlined"
                        onChange={this.handleChange('name')}
                        name="name"
                        value={name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    /> <br/> <br />
                    <TextValidator
                        label="Email"
                        variant="outlined"
                        onChange={this.handleChange('email')}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <br/> <br />
                    <TextValidator
                        label="Message"
                        variant="outlined"
                        onChange={this.handleChange('message')}
                        name="message"
                        value={message}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br/> <br />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </ValidatorForm>
            </div>  
        )
    }
}

export default UserForm
