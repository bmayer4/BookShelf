import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from './../actions';
import BookItem from './../widgets/BookItem';

class HomeContainer extends Component {

    state = {
        reachedEnd: false
    }

    loadMore = () => {
     let prev = this.props.books.length;
     this.props.getBooks(this.props.books.length, 3, 'asc').then(() => {
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

    render() {
    return (
            <div className="bookCont">
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
      books: state.books.books
    };
  };

const mapDispatchToProps = (dispatch) => ({
    getBooks: (skip, limit, order) => dispatch(getBooks(skip, limit, order))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

