/**
 * # Login.js
 *
 *  The container to display the Login form
 *
 */
'use strict';
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * Immutable
 */
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * The necessary React components
 */
import React from 'react-native';


const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

function buttonPressHandler(login, username, password) {
  login (username, password);
}

// let Login = React.createClass({
//
//   render() {
//     let loginButtonText = 'Log in';
//     let onButtonPress = buttonPressHandler.bind(null,
// 				                this.props.actions.login,
// 				                this.props.auth.form.fields.username,
// 				                this.props.auth.form.fields.password
// 		                               );
//
//     return(
//       <LoginRender
//           formType={ LOGIN }
//           loginButtonText={ loginButtonText }
//           onButtonPress={ onButtonPress }
//           displayPasswordCheckbox={ true }
//           leftMessageType={ REGISTER }
//           rightMessageType={ FORGOT_PASSWORD }
//           auth={ this.props.auth }
//           global={ this.props.global }
//       />
//     );
//   }
// });

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var Login = React.createClass({
  render: function() {
    var _this = this;
    return (
      <FBLogin style={{ marginBottom: 10, }}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          console.log("Logged in!");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
