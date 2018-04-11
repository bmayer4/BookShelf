const initialState = {
    books: [],
    userBooks: [],
    usersBooks: [],
    indivBook: {}
  }

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
        return { ...state, books: [...state.books, ...action.payload.books]};
        case 'POST_BOOK':
        if (state.books.length < 3) {
            return {...state, books: [...state.books, action.payload], userBooks: [...state.userBooks, action.payload]};
        }
        return {...state, userBooks: [...state.userBooks, action.payload]};
        case 'GET_BOOK':
        return {...state, indivBook: action.payload.book }
        case 'GET_USER_BOOKS': 
        return {...state, userBooks: [...action.payload.books]}
        case 'GET_USERS_BOOKS': 
            return {...state, usersBooks: [...action.payload.books]};
        case 'CLEAR_USERS_BOOKS':
            return {...state, usersBooks: []}
        case 'DELETE_BOOK': 

        let remainingBooks = state.books.filter((book) => {
           return book._id !== action.payload.book._id
        });

       let remainingUserBooks = state.userBooks.filter((book) => {
            return book._id !== action.payload.book._id
        });
        return {...state, books: [...remainingBooks], userBooks: [...remainingUserBooks]}
        case 'EDIT_BOOK':
        
        let books = state.books.map((book) => {  
            if (book._id === action.payload.book._id) {
                return { ...book, ...action.payload.book }
            }
            return book
        });

        let userBooks = state.userBooks.map((book) => {  
            if (book._id === action.payload.book._id) {
                return { ...book, ...action.payload.book }
            }
            return book
        });
            return {...state, books: [...books], userBooks: [...userBooks]}
        default:
            return state
    }
}

export default booksReducer;