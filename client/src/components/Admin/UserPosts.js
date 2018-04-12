import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserBooks } from './../../actions';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserPosts extends Component {

    componentDidMount() {
        if (this.props.userBooks.length === 0) {
            this.props.getUserBooks();
        }
    }

    showUserPosts(userBooks) {
        return userBooks ?
        userBooks.map((book) => {
           return (
            <tr key={book._id}>
            <td><Link to={`/user/edit/${book._id}`}>{book.name}</Link></td>
            <td>{book.author}</td>
            <td>{moment(book.createdAt).format('MMM D, YYYY')}</td>
            </tr>
            )
        })
        : null
    }

render() {

    return (
        <div className="user_posts">
        <h3>Your Reviews</h3>   
        <table>
        <thead>
        <tr>
        <th>Name</th>
        <th>Author</th>
        <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {this.showUserPosts(this.props.userBooks)}
        </tbody>
        </table>
        </div>
    );
}

}

const mapStateToProps = (state) => {
    return {
      userBooks: state.books.userBooks
    };
  };

const mapDispatchToProps = (dispatch) => ({
    getUserBooks: () => dispatch(getUserBooks())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);