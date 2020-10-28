import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Import Google and Facebook react login to use Google and Facebook buttons
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import * as actions from '/Users/melissa/Desktop/InventoryManagementApp/client/src/actions/index.action';
import CustomInput from './CustomInput';

// Create a login form using reduxForm.
class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    // A function to call login actioncreator and redirect to /admin or /user page
    async onSubmit(formData) {
        // call actioncreator
        await this.props.login(formData);
        if (this.props.isAdmin) {
            this.props.history.push('/admin');
        } else {
            this.props.history.push('/user')
        }
    }

    // A function to call google actioncreator and redirect to /user page 
    async responseGoogle(res) {
        await this.props.oauthGoogle(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/user');
        }
    }

    // A function to call facebook actioncreator and redirect to /user page
    async responseFacebook(res) {
        console.log('responseFacebook', res);
        await this.props.oauthFacebook(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/user');
        }
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="container">
                    <div className="row">
                        <div className="col localLoginform">
                            <form onSubmit={handleSubmit(this.onSubmit)} className="container">
                                <fieldset>
                                    <Field
                                        name="email"
                                        type="text"
                                        id="email"
                                        label="Enter your email"
                                        placeholder="example@example.com"
                                        component= { CustomInput } />
                                </fieldset>
                                <fieldset>
                                    <Field
                                        name="password"
                                        type="password"
                                        id="password"
                                        label="Enter your password"
                                        placeholder="password"
                                        component= { CustomInput } />
                                </fieldset>
                                <fieldset style={{}}>
                                    <Field
                                        name="isAdmin"
                                        type="checkbox"
                                        id="isAdmin"
                                        label="Are you an admin?"
                                        component= { CustomInput } />
                                </fieldset>

                                { this.props.errorMessage ? 
                                <div className="alert alert-danger">
                                    { this.props.errorMessage }
                                </div> : null }

                                <button type="submit" className="btn btn-primary loginButton">Login</button>
                            </form>
                        </div>
                        <div className="col">
                            <div className="text-center">
                                <div className="alert alert-warning">
                                    Login using Facebook or Google
                                </div>
                                <FacebookLogin 
                                    appId="1710043372493359"
                                    textButton="Facebook"
                                    fields="name, email, picture"
                                    callback={this.responseFacebook} 
                                />
                                
                                <GoogleLogin 
                                    clientId="1024070526390-5t96st7l1ng0uldormdspbo6i0dbrk24.apps.googleusercontent.com"
                                    buttonText="Google"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    className="googleButton"
                                />
                            </div>
                        </div>
                    </div>
            </div>
            
        )
    }
}

// Using mapStateToProps to use isAuthenticated and isAdmin state
function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        isAdmin: state.auth.isAdmin
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'login'})
)(Login) 
