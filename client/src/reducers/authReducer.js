const initialState = {
    auth: false,
    registered: false,
    user: {},
    regUsers: [],
    error: ''
  }

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
        return { ...state, error: '', auth: true, user: action.payload }
        case 'USER_AUTH':
        //won't get called if no user 
        return { ...state, error: '', auth: true, user: action.payload }
        case 'GET_USERS':
        return {...state, regUsers: [...action.payload.users]}
        case 'REGISTER_USER':
        return {...state, error: '', registered: true, regUsers: [...state.regUsers, action.payload]}
        case 'AUTH_ERROR':
        return { auth: false, registered: false, error: action.payload }
        case 'USER_LOGOUT':
        console.log(action.payload.message);
        return { ...state, auth: false, registered: false }
        default:
            return state
    }
}

export default authReducer;