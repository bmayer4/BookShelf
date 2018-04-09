import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editBook, getBook, deleteBook } from './../actions';


class AddReviewContainer extends Component {


    state = {
        "name": this.props.book ? this.props.book.name : '', //componentWillRecieveProps is doing the work
        "author": this.props.book ? this.props.book.author : '',  
        "review": this.props.book ? this.props.book.review : '', 
        "pages": this.props.book ? this.props.book.pages : '',  
        "rating": this.props.book ? this.props.book.rating : '',  
        "price": this.props.book ?this.props.book.price : '', 
        "error": ''
}

    componentDidMount() {
        if (!this.props.book) {
            console.log('going into database');
            this.props.getBook(this.props.match.params.id).catch(() => {  
                this.props.history.push('/');
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        if (!this.props.book && this.props.indivBook) {
        this.setState({
            name: nextProps.indivBook.name,
            author: nextProps.indivBook.author,
            review: nextProps.indivBook.review,
            pages: nextProps.indivBook.pages,
            rating: nextProps.indivBook.rating,
            price: nextProps.indivBook.price
        })
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

    onSubmit = (e) => {
        e.preventDefault();
        let formResult = this.checkForm();

        if (!formResult) {
            this.setState({
                error: 'Review can\'t be empty'
            });
        } else {
            this.setState({
                error: ''
            });
            const id = (this.props.book ? this.props.book._id : this.props.indivBook && this.props.indivBook._id);
            this.props.editBook(id, {
                name: this.state.name,
                author: this.state.author,
                review: this.state.review,
                pages: this.state.pages,
                rating: this.state.rating,
                price: this.state.price
            }).then(() => {
                this.props.history.push('/user/reviews');
            }).catch(() => { console.log('something went wrong') })
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    } 

    removeBook = () => {
        const id = (this.props.book ? this.props.book._id : this.props.indivBook && this.props.indivBook._id);
        this.props.deleteBook(id).then(() => {
            this.props.history.push('/user/reviews');
        }).catch(() => {
            console.log('something went wrong');  //can catch here if not catching inside thunk api call
        });
    }
    

    render() {
        return (
            <div className="rl_container article">
            <form onSubmit={this.onSubmit}>
            <h2>Edit Review</h2>
            { this.state.error && <div className="form_error">{this.state.error}</div> }
            <div className="form_element">
            <input type="text" name="name" placeholder="Enter name" value={this.state.name} onChange={this.onChange}/>
            </div>
            <div className="form_element">
            <input type="text" name="author" placeholder="Enter author" value={this.state.author} onChange={this.onChange}/>
            </div>
            <textarea name="review" value={this.state.review} onChange={this.onChange}/>
            <div className="form_element">
            <input type="number" name="pages" placeholder="Enter pages" value={this.state.pages} onChange={this.onChange}/>
            </div>
            <div className="form_element_custom">
            <select name="rating" value={this.state.rating} id="sel" onChange={this.onChange}>
            <option val="1">1</option>
            <option val="2">2</option>
            <option val="3">3</option>
            <option val="4">4</option>
            <option val="5">5</option>
            </select>
            </div>
            <div className="form_element">
            <input type="number" name="price" placeholder="Enter price" value={this.state.price} onChange={this.onChange}/>
            </div>
            <div className="btn_custom">
            <button>Save Review</button>
            </div>
            <div className="delete_post">
            <div className="button" onClick={this.removeBook}>
            Delete Review
            </div>
            </div>
            </form>
            </div>
        );
    }
}


const mapStateToProps = (state, props) => ({ 
    book: state.books.userBooks.find((book) => { return book._id === props.match.params.id }),
    indivBook: state.books.indivBook
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getBook: (id) => dispatch(getBook(id)),
        editBook: (id, book) => dispatch(editBook(id, book)),
        deleteBook: (id) => dispatch(deleteBook(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddReviewContainer);