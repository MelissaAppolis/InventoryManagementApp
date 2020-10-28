import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

// Import components
import CreateStockItem from './components/CreateStockItem';
import EditStockItem from './components/EditStockItem';
import Login from './components/Login';
import reducers from './reducers/index.reducer';
import AdminInventoryList from './components/AdminInventoryList';
import UserInventoryList from './components/UserInventoryList';
import App from './components/App';


// Getting jwt token and admin authentication from local storage
const jwtToken = localStorage.getItem('JWT_TOKEN');
const isAdmin = localStorage.getItem('Admin') ? true : false;

// Creating store
// Creating Routes
ReactDOM.render(
  <Provider store={createStore(reducers, {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
      isAdmin: isAdmin
    }    
    
  }, applyMiddleware(reduxThunk))}>
    <Router> 
      <App>
        <Route exact path="/admin" component={AdminInventoryList} />
        <Route exact path="/user" component={UserInventoryList} />
        <Route exact path="/create" component={CreateStockItem} />
        <Route exact path="/edit/:id" component={EditStockItem} />
        <Route exact path="/" component={Login} />
        <Route exact path="/signout" component={Login} />
        </App>
    </Router>
  </Provider>,
  document.querySelector('#root'));

serviceWorker.unregister();
