const { redux, createStore, applyMiddleware } = require('redux')

const thunkMiddleware = require('redux-thunk').default
const axios = require('axios');


const intialState = {
    loading: false,
    user: [],
    error: ''
}

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';


const userRequest = () => {
    return {
        type: USER_REQUEST
    }
}
const userSucess = (user) => {
    return {
        type: USER_SUCCESS,
        payload: user
    }
}

const userError = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    }
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case USER_REQUEST: return {
            ...state, loading: true
        }
        case USER_SUCCESS: return {
            loading: false, user: action.payload
        }
        case USER_ERROR: return {
            loading: false, user: [], error: action.payload
        }
    }
}

const fetchUsser = () => {
    return function (dispatch) {
        dispatch(userRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data
                const users = response.data.map(user => user.name);
                dispatch(userSucess(users));
            })
            .catch(err => {
                //err.message
                dispatch(userError(err.message));
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsser());