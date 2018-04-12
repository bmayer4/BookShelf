import axios from 'axios';

//not using promise middleware
// export const getBooks = (start = 0, limit = 10, order = 'asc') => {
//     return (dispatch, getState) => {
//         axios.get(`/api/books?skip=${start}&limit=${limit}&order=${order}`).then((res) => {
//             dispatch({
//                 type: 'GET_BOOKS',
//                 payload: res.data
//             })
//         }).catch((e) => {
//             console.log('Error fetching books: ', e);
//         });
//     };
// };


//BOOKS------------------------------------

//show post and edit post both use this, but we don't want edit post to get id of something that isn't there, would need to make a route that finds book if owner is req.user (still can't actually delete or edit either way)
export const getBooks = (start = 0, limit = 10, order = 'asc') => 
async (dispatch, getState) => {
    const res = await axios.get(`/api/books?skip=${start}&limit=${limit}&order=${order}`); 
        dispatch({
            type: 'GET_BOOKS',
            payload: res.data
        });
};

export const getMoreBooks = (start = 0, limit = 10, order = 'asc') => 
async (dispatch, getState) => {
    const res = await axios.get(`/api/books?skip=${start}&limit=${limit}&order=${order}`); 
        dispatch({
            type: 'GET_MORE_BOOKS',
            payload: res.data
        });
};


export const getBook = (id) => 
async (dispatch, getState) => {
    const res = await axios.get(`/api/books/${id}`);
        dispatch({
            type: 'GET_BOOK',
            payload: res.data
        });
};






export const addBook = (book) =>
async (dispatch, getState) => {
    const res = await axios.post('/api/books', book).catch((e) => {
        console.log(e);
    });

    if (res) {
        dispatch({
            type: 'POST_BOOK',
            payload: res.data
        })
    }
}


export const getUserBooks = () =>
async (dispatch, getState) => {
    const res = await axios.get('/api/user/books'); 
    if (res) {
        dispatch({
            type: 'GET_USER_BOOKS',
            payload: res.data
        })
    }
}

export const getUsersBooks = (id) =>
async (dispatch, getState) => {
    const res = await axios.get(`/api/user/${id}`);  //no catch, using it in UsersPageContainer.js
            //if valid user id, will return empty array of books, if non existing user id, will return 404, catch it in UsersPageContainer.js
    if (res) {
        dispatch({
            type: 'GET_USERS_BOOKS',
            payload: res.data
        })
    }
}

export const clearUsersBooks = () => {
    return {
        type: 'CLEAR_USERS_BOOKS'
    }
}

export const editBook = (id, book) => {
    return async (dispatch, getState) => {
        const res = await axios.patch(`/api/books/${id}`, book);

        if (res) {
            dispatch({
                type: 'EDIT_BOOK',
                payload: res.data
            })
        }
    }
}

export const deleteBook = (id, book) => {
    return async (dispatch, getState) => {

        const res = await axios.delete(`/api/books/${id}`, book);  //**** if you catch it here, you can't catch it when you call the action to dispatch

        if (res) {
            dispatch({
                type: 'DELETE_BOOK',
                payload: res.data
            })
        }
    }
}


//USER------------------------------------


export const loginUser = ({ email, password}) => 
async (dispatch, getState) => {

    const res = await axios.post(`/api/login`, {email, password}).catch((e) => { 
        dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message});
    })

    if (res) {
        dispatch({
            type: 'USER_LOGIN',
            payload: res.data
        });
    }
}

export const registerUser = (userObject) => {
    return async (dispatch, getState) => {

        const res = await axios.post('/api/register', userObject).catch((e) => { 
            dispatch({ type: 'AUTH_ERROR', payload: e.response.data.message});
        });

        if (res) {
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data
            })
        }
    }
}

export const checkAuth = () =>
async (dispatch, getState) => {
    const res = await axios.get('/api/auth').catch((e) => {
        console.log(e);
    });

    if (res) {
        dispatch({
            type: 'USER_AUTH',
            payload: res.data
        })
    }
}



export const getUsers = () => {
    return async (dispatch, getState) => {

        const res = await axios.get('/api/users');

        if (res) {
            dispatch({
                type: 'GET_USERS',
                payload: res.data
            })
        }
    }
}


export const logoutUser = () =>
async (dispatch, getState) => {
    const res = await axios.delete('/api/logout').catch((e) => {
        console.log(e);
    });
    console.log(res.data);

             dispatch({ 
                type: 'USER_LOGOUT'
            })
}

