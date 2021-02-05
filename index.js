//const redux = require('redux');

const redux = require('redux');

//create store
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;


const initialBooks = {
    numberOfBooks: 10
}

const initialPens = {
    numberOfPens: 15
}



//action creator : wrapping the action in a single fuction
function buyBook() {
    //action
    return {
        type: "Buy_Book",
        payload: "My First Action"
    };
}

function buyPen() {
    //action
    return {
        type: "Buy_Pen",
        payload: "My second action"
    };
}


//Reducer (prevState, action)=>NewState

const bookReducer = (state = initialBooks, action) => {
    switch (action.type) {
        case "Buy_Book": return {
            ...state,
            numberOfBooks: state.numberOfBooks - 1
        }
        default: return state;
    }
}

const penReducer = (state = initialPens, action) => {
    switch (action.type) {
        case "Buy_Pen": return {
            ...state,
            numberOfPens: state.numberOfPens - 2
        }
        default: return state;
    }
}

const reducer = combineReducers({
    pen: penReducer,
    book: bookReducer
});

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            console.log("middleware log", result);
            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger));
console.log("Initial Sate", store.getState());
const unsubscribe = store.subscribe(() => { console.log('updated State value', store.getState()) });
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();