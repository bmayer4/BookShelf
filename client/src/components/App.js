import React, { Component } from 'react';  
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Layout from './../hoc/Layout';
import BooksContainer from './../containers/BooksContainer';
import LoginContainer from './../containers/LoginContainer';
import AddReviewContainer from './../containers/AddReviewContainer';
import EditReviewContainer from './../containers/EditReviewContainer';
import RegisterContainer from './../containers/RegisterContainer';
import UsersPageContainer from './../containers/UsersPageContainer';
import Auth from './../hoc/Auth';
import User from './../components/Admin/User';
import UserPosts from './../components/Admin/UserPosts';
import Logout from './Admin/Logout';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <Layout>
            <div className="cont">
            <Switch>  
            <Route path="/" exact component={Auth(Home, null)}/>
            <Route path="/books/:id" component={Auth(BooksContainer, null)}/>
            <Route path="/user" exact component={Auth(User, 'private')}/>
            <Route path="/user/add" component={Auth(AddReviewContainer, 'private')}/>
            <Route path="/user/login" component={Auth(LoginContainer, 'public')}/>
            <Route path="/user/logout" component={Auth(Logout, 'private')} />
            <Route path="/users/:id" component={Auth(UsersPageContainer, null)}/>
            <Route path="/user/reviews" component={Auth(UserPosts, 'private')} />
            <Route path="/user/register" component={Auth(RegisterContainer, 'public')}/>
            <Route path="/user/edit/:id" component={Auth(EditReviewContainer, 'private')}/>
            </Switch>  
            </div>
            </Layout>
            </BrowserRouter>
        );
    }
}

export default App;