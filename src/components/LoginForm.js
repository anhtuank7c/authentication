import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import validation from '../util/validation';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      error: '',
      email: '',
      password: '',
      loading: false,
      emailBorder: 'transparent',
      passwordBorder: 'transparent',
      errorColor: 'red',
    }
  }

  login() {
    const { email, password } = this.state;
    this.setState({
      loading: true,
    });

    this.app.authenticate({
      type: 'local',
      email: email,
      password: password,
    })
    .then((response) => this.loginSuccess())
    .catch((error) => {
      console.log('Sign in error: ', error.message);

        // .create({
        //   email: email,
        //   password: password,
        // }).then((response) => {
        //   console.log('Registered sucessful');
        //   this.setState({
        //     loading: false
        //   });
        // }).catch((lerror) => {
        //   this.setState({ error: lerror, errorColor: 'red'})
        //   this.props.onLoginSuccess(false);
        // });
    });
  }

  loginSuccess() {
    this.setState({
      loading: false,
      email: '',
      password: '',
      error: 'Login successful',
      errorColor: 'green',
    });
    this.props.onLoginSuccess(true);
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size='small' />;
    }
    return (<Button onPress={this.login.bind(this)}>Login</Button>);
  }

  onChangeEmail(text) {
    this.setState({email: text});
    if(!validation.validateEmail(text)) {
      this.setState({
        emailBorder: '#FFC200'
      })
    } else {
      this.setState({
        emailBorder: 'transparent'
      })
    }
  }

  onChangePassword(text) {
    this.setState({password: text});
    if(!validation.validatePassword(text)) {
      this.setState({
        passwordBorder: '#FFC200'
      })
    } else {
      this.setState({
        passwordBorder: 'transparent'
      })
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            value={this.state.email}
            autoCorrect={false}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            returnKeyType={'next'}
            style={{borderWidth: 1, borderColor: this.state.emailBorder}}
            placeholder="Email"
            onChangeText={(text) => this.onChangeEmail(text)} />
        </CardSection>
        <CardSection>
          <Input
            label={'Password'}
            value={this.state.password}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            keyboardType={'default'}
            returnKeyType={'go'}
            placeholder="password"
            style={{borderWidth: 1, borderColor: this.state.passwordBorder}}
            onChangeText={(text) => this.onChangePassword(text)} />
        </CardSection>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
          <Text style={{color: this.state.errorColor}}>{this.state.error}</Text>
        </View>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
