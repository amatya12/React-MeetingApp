// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
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
      user: null,
      displayName: null,
      userID: null
    }
    // this.registerUser = this.registerUser.bind(this);
    // this.logOutUser = this.logOutUser.bind(this);
  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        const meetingRef = firebase.database().ref('meetings/' + FBUser.uid);
        meetingRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];
          for (let item in meetings) {
            console.log(item);
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

  registerUser = (userName) => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/meetings");

      })
    })
  }

  logOutUser = (e) => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });
    firebase.auth().signOut().then(() => {
      navigate('/login');
    })
  }

  addMeeting = (meetingName) => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);

    ref.push({ meetingName: meetingName });
  };
  render() {

    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome userName={this.state.displayName} logOutUser={this.logOutUser} />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" user={this.state.user} />
          <Mettings path="/meetings"
            user={this.state.user}
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
            userID={this.state.userID}
          />
          <Register path="/register" user={this.state.user} registerUser={this.registerUser} />
        </Router>
      </div>
    );

  }
}

export default App;