import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from './../actions';

class AddReviewContainer extends Component {

    state = {
            "name": '',
            "author": '',
            "review": '',
            "pages": '',
            "rating": 5,
            "price": '',
            "error": ''
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
                error: 'Please fill out form'
            });
        } else {
            this.setState({
                error: ''
            });
            this.props.addBook({
                name: this.state.name,
                author: this.state.author,
                review: this.state.review,
                pages: this.state.pages,
                rating: this.state.rating,
                price: this.state.price
            }).then(() => {
                this.props.history.push('/');
            })
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    } 
    

    render() {
        return (
            <div className="rl_container article">
            <form onSubmit={this.onSubmit}>
            <h2>Add Review</h2>
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
            <button>Add Review</button>
            </div>
            </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addBook: (book) => dispatch(addBook(book)) 
    }
}


export default connect(null, mapDispatchToProps)(AddReviewContainer);