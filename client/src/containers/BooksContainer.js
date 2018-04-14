import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBook } from './../actions';
import { Link } from 'react-router-dom';

class BooksContainer extends Component {

    componentDidMount() {
        if (!this.props.book) {
            console.log('hit database');
            this.props.getBook(this.props.match.params.id).catch(() => {
                this.props.history.push('/');
            }); 
        }
    }
//<Link to={`/users/${book.ownerId._id}`}>
    renderBook = (book) => {
        return book ? (
            <div className="br_container">
                <div className="br_header">
                <h2>{book.name}</h2>
                <h5>{book.author}</h5>
                <div className="br_reviewer">
                <span>Reviewed by:</span> <Link to={`/users/${book.ownerId._id}`}>{book.ownerId.firstName} {book.ownerId.lastName}</Link>
                </div>
                </div>
                <div className="br_review">
                {book.review}
                </div>
                <div className="br_box">
                <div className="left">
                <div>
                <span>Pages: {book.pages}</span>
                </div>
                <div>
                <span>Price: ${book.price}</span>
                </div>
                </div>
                <div className="right">
                <span>Rating</span>
                <div>
                <span>{book.rating}/5</span>
                </div>
                </div>
                </div>
            </div>
        ) : null
    }

    render() {

    return (
        <div>
        { 
           this.renderBook(this.props.book ? this.props.book : (this.props.indivBook.ownerId && this.props.indivBook))
        }
        </div>
        );
}
}

const mapStateToProps = (state, props) => {
    console.log(state);
    return {
        book: state.books.books.find((book) => { return book._id === props.match.params.id }),
        indivBook: state.books.indivBook
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
      return {
          getBook: (id) => dispatch(getBook(id))
      }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
