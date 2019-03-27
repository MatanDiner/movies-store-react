import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import authReducer from './store/reducers/auth'
import moviesReducer from './store/reducers/movies'
import cartReducer from './store/reducers/cart'
import sellReducer from './store/reducers/sell'
import ordersReducer from './store/reducers/orders'
import contactUsReducr from './store/reducers/contactUs'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
movies:moviesReducer,
auth:authReducer,
cart:cartReducer,
sell:sellReducer,
orders:ordersReducer,
contactUs:contactUsReducr
})

const store = createStore(rootReducers,composeEnhancers(
    applyMiddleware(thunk)
));


const app = (

<Provider store={store}>
<BrowserRouter>
<App/>
</BrowserRouter>
</Provider>


)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
