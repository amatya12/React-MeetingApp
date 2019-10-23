// Import React
import React, { Component } from 'react';
import { Router } from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Navigation from './Navigation';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Mettings from './Meetings';


class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const ref = firebase.database().ref('user');

    ref.on('value', snapshot => {
      let FBUser = snapshot.val();
      this.setState({ user: FBUser });
    });
  }
  render() {

    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && (
          <Welcome user={this.state.user} />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" user={this.state.user} />
          <Mettings path="/meetings" user={this.state.user} />
          <Register path="/register" user={this.state.user} />
        </Router>
      </div>
    );

  }
}

export default App;