import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../actions';


class LoginContainer extends Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    componentWillReceiveProps(nextProps) {
        console.log('np', nextProps);
        if (nextProps.auth.auth) {  
            this.props.history.push('/');
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({
            email: email
        }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({
            password: password
        }));
    };

    onSubmit= (e) => {
        e.preventDefault();
        
        if (!this.state.email || !this.state.password) {
            this.setState(() => ({ error: 'Please fill out form' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.loginUser({email: this.state.email, password: this.state.password});
        }
    }

    render() {
        return (
            <div className="rl_container">
            <form onSubmit={this.onSubmit}>
            <h2>Login</h2>
            {this.state.error ? <div className="err">{this.state.error}</div> : null}
            {this.props.auth.error ? <div className="err">{this.props.auth.error}</div> : null}
            <div className="form_element">
            <input type="email" placeholder="Email" autoFocus value={this.state.email} onChange={this.onEmailChange} />
            </div>
            <div className="form_element">
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            </div>
            <button>Login</button>  
            </form>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginUser: (data) => { dispatch(loginUser(data)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
