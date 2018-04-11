import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ComposedClass, restrict) => {

 class AuthenticationCheck extends Component {

    state = {
        loading: true
    }

    renderClass = () => {

        switch (restrict) {

            case 'private': {
                if (this.props.auth.auth) {
                    console.log('private')
                    return <ComposedClass {...this.props} />
                } else {
                    return this.props.history.push('/user/login');
                }
            }
            case 'public': {  //login
                if (this.props.auth.auth) {
                    console.log('not private');
                    return this.props.history.push('/');
                } else {
                    return <ComposedClass {...this.props} />
                }
            }
            default: {
                return <ComposedClass {...this.props} />
            }
        } 
    }

     render() {

         return (
             <div>
             {this.renderClass()}
             </div>
         );
     }
 }

 const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

return connect(mapStateToProps)(AuthenticationCheck)


}

