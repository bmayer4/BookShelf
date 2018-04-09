import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, registerUser } from './../actions';


class RegisterContainer extends Component {


    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: ''
    }

    componentDidMount() {
        if (this.props.auth.regUsers.length === 0) {
            console.log('fetching from database');
            this.props.getUsers();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('np', nextProps);
        if (nextProps.auth.registered) {
            this.props.history.push('/user/login');
        }
    }

    checkForm = () => {
        let result = true
        for (let s in this.state) {
            if (s !== 'error') {
            if (!this.state[s]) {
                result = false;
            }
            }
        }
        return result;
    }

    onChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    } 

    showAdminUsers = (users) => {
        return users ?
        users.map((user) => {
           return (
            <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            </tr>
            )
        })
        : null
    }

    onSubmit = (e) => {
        e.preventDefault();
        let formResult = this.checkForm();
       
        if (!formResult) {
            this.setState({
                error: 'Review can\'t be empty'
            });
        } else if (this.state.password.length < 5) {
            this.setState({
                error: 'Password minimum is 6 characters'
            });
        } else {
            this.setState({
                error: ''
            });
            this.props.registerUser({ 
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                email: this.state.email, 
                password: this.state.password
            });
        }
    }

    render() {
        return (
            <div className="rl_container">
            <form onSubmit={this.onSubmit}>
            <h2>Register</h2>
            {this.state.error ? <div className="err">{this.state.error}</div> : null}
            {this.props.auth.error ? <div className="err">{this.props.auth.error}</div> : null}
            <div className="form_element">
            <input type="text" placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
            </div>
            <div className="form_element">
            <input type="text" placeholder="Last name" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
            </div>
            <div className="form_element">
            <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange}/>
            </div>
            <div className="form_element">
            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
            </div>
            <button>Add User</button>
            </form>

            <div className="current_users">
            <h2>Current Users</h2>
            <table>
            <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {this.showAdminUsers(this.props.auth.regUsers)}
            </tbody>
            </table>
            </div>
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
        getUsers: () => { dispatch(getUsers()) },
        registerUser: (data) => { dispatch(registerUser(data)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)