import React from 'react';
import { Provider } from 'react-redux';
import Login from './Login';
import renderer from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index.reducer';
import reduxThunk from 'redux-thunk';

const jwtToken = localStorage.getItem('JWT_TOKEN');
const isAdmin = localStorage.getItem('Admin') ? true : false;

const store = createStore(reducers, {
    auth: {
      token: jwtToken,
      isAuthenticated: jwtToken ? true : false,
      isAdmin: isAdmin
    }    
    
  }, applyMiddleware(reduxThunk));

describe('renders correctly', () => {
    const tree = renderer.create(
    <Provider store={store}>
        <Login/>
    </Provider>
    ).toJSON();
    expect(tree).toMatchSnapShot();
});