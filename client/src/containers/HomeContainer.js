import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, getMoreBooks, getUserBooks } from './../actions';
import BookItem from './../widgets/BookItem';

class HomeContainer extends Component {

    state = {
        reachedEnd: false
    }

    componentDidMount() {
        this.props.getBooks(0, 3, 'asc');
        if (this.props.auth.auth && this.props.userBooks.length === 0) {  //we redirect here on login
            console.log('fetching user books');
            this.props.getUserBooks();
        }
    }

    loadMore = () => {
     let prev = this.props.books.length;
     this.props.getMoreBooks(this.props.books.length, 3, 'asc').then(() => {
        if (this.props.books.length === prev) {
            this.setState({ reachedEnd: true });
        }
     });
    }



    renderItems = (books) => {
        return books.length ? books.map((book, i) => {
            return <BookItem {...book} key={i}/>
        })
        : (
             <div>No Books</div>
         )
    }

    renderHeader = () => {
        return (
        <div className="users_page_header">
        <div>Book Reviews</div>
        </div> 
        );
    }


    render() {
    return (
            <div className="bookCont">
            {this.renderHeader()}
            {this.renderItems(this.props.books)}
            {
                !this.state.reachedEnd && this.props.books && this.props.books.length > 0 ? <div className="loadmore" onClick={this.loadMore}>
                Load More
                </div> : null
             }
            </div>
        );
}
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      auth: state.auth, 
      books: state.books.books,
      userBooks: state.books.userBooks
    };
  };

const mapDispatchToProps = (dispatch) => ({
    getBooks: (skip, limit, order) => dispatch(getBooks(skip, limit, order)),
    getMoreBooks: (skip, limit, order) => dispatch(getMoreBooks(skip, limit, order)),
    getUserBooks: () => { dispatch(getUserBooks()) }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

