const initialState = {
    books: [],
    userBooks: [],
    usersBooks: [],
    indivBook: {}
  }

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
        return { ...state, books: [...action.payload.books]};
        case 'GET_MORE_BOOKS':
        return { ...state, books: [...state.books, ...action.payload.books]};
        case 'POST_BOOK':
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
       let remainingUserBooks = state.userBooks.filter((book) => {
            return book._id !== action.payload.book._id
        });
        return {...state, userBooks: [...remainingUserBooks]}
        case 'EDIT_BOOK':

        let userBooks = state.userBooks.map((book) => {  
            if (book._id === action.payload.book._id) {
                return action.payload.book
            }
            return book
        });
            return {...state, userBooks: [...userBooks]}
        default:
            return state
    }
}

export default booksReducer;