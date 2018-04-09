import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from './../../actions';


class Logout extends Component {

    componentDidMount() {
        this.props.logoutUser().then(() => {
            this.props.history.push('/');
    })
  
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(Logout)