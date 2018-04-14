import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
//import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { checkAuth } from './actions';
import Loader from '../src/components/Loader';

const store = createStore(reducers, {}, applyMiddleware(thunk));  

ReactDOM.render(<Loader />, document.getElementById('root'));

//let rendered = false
console.log('rendered');

store.dispatch(checkAuth()).then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
});





