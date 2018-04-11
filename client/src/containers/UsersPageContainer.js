import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUsersBooks, clearUsersBooks } from './../actions';
import BookItem from './../widgets/BookItem';

class UsersPageComponent extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUsersBooks(id).catch(() => {
            this.props.history.push('/');
        });
    }

    componentWillUnmount() {
        this.props.clearUsersBooks();
    }


    renderItems = (books) => {
        return books.length ? books.map((book, i) => {
            return <BookItem {...book} key={i}/>
        })
        : (
             <div>No Books</div>
         )
    }

    renderHeader = (user) => {
        return user ? 
        <div className="users_page_header">
       <span>Reviews By:</span><div>{user.firstName} {user.lastName}</div>
        </div> 
        : null
    }


    render() {
        return (
            <div>
            {this.renderHeader(this.props.usersBooks[0] && this.props.usersBooks[0].ownerId)}
                {this.renderItems(this.props.usersBooks)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.books)
    return { 
        usersBooks: state.books.usersBooks
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsersBooks: (id) => { return dispatch(getUsersBooks(id)) },
        clearUsersBooks: () => { dispatch(clearUsersBooks()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPageComponent)