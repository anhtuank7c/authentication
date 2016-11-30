import React, { Component, AsyncStorage } from 'react';
import { AppRegistry, View } from 'react-native';
// import '../util/UserAgent';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication/client';

import { Header, Button, Card, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';

class App extends Component {
  state = {
    connected: false,
    loggedIn: false,
  }
  constructor(props) {
    super(props);
    const socket = io('http://albums.crabstudio.info', { transports: ['websocket'], forceNew: true});
    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      .configure(authentication({
        storage: AsyncStorage
      }));
  }

  componentDidMount() {
    this.app.io.on('connect', () => {
      this.setState({
        connected: true
      });
      console.log('socket connected');
    });

    this.app.io.on('disconnect', () => {
      this.setState({
        connected: false,
      });
      console.log('socket disconnected');
      // Actions.offline();
    })

  }

  onLoginSuccess = (status) => {
    this.setState({
      loggedIn: status
    });
    console.log('Login status: ', this.state.loggedIn);
    this.app.service('users').find({}).then((result) => console.log(result));
    console.log('loggedIn: ', this.app.get('token'));
  }

  logout() {
    this.app.logout();
    this.setState({
      loggedIn: false
    });
    console.log('loggedOut: ', this.app.get('token'));
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={this.logout.bind(this)}>Logout</Button>
            </CardSection>
          </Card>
        );
      case false:
        return (
          <LoginForm app={this.app} onLoginSuccess={this.onLoginSuccess}/>
        );
      default:
        return (
          <Spinner size="large" />
        );
    }
  }

  render() {
    return (
      <View>
        <Header title={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
