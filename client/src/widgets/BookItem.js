import React from 'react'
import { Link } from 'react-router-dom';

const BookItem = (props) => {
    return(
        <div>
            <Link to={`/books/${props._id}`} className="book_item">
            <div className="book_header">
            <h2>{props.name}</h2>
            </div>
            <div className="book_items">
            <div>{props.author}</div>
            <div className="book_bubble">
            <strong>Price</strong> ${props.price}
            </div>
            <div className="book_bubble">
            <strong>Pages</strong> {props.pages}
            </div>
            <div className="book_bubble">
            <strong>Rating</strong> {props.rating}
            </div>
            </div>
            </Link>
        </div>
    )
}

export default BookItem