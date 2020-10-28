import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions/index.action';
import '../App.css'

// Import component
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
          <div>
          { this.props.children }
          </div>
      </div>
    );
  } 
}

export default connect(null, actions)(App);
