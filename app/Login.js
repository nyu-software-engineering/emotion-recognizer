import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import {initFirebase} from './InitFirebase';

//instantiate the Firebase app
const firebase = new initFirebase();

//design imports
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Overlay, FormLabel, FormInput, Button, icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
     backgroundColor: '#ccc',
     flex: 1,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
 },
 fieldText: {
      width: '50%',
      padding: 10,
      margin: 40,
      borderWidth: 1,
      borderColor: "#999",
      borderRadius: 3,
      backgroundColor: "rgba(204,204,204, .8)",
      color: global.darkText,
 },
 button: {
   backgroundColor: global.backgroundWhite,
   width: 300,
   height: 45,
   borderColor: "transparent",
   borderWidth: 0,
   borderRadius: 5
 }
});


class Login extends React.Component {
  //set up the title of this screen
  static navigationOptions = {
   title: "Log In"
  };

  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
      console.log("Constructing...");

      super(props); // call the parent class's (React.Component) constructor first before anything else

      console.log(props);

      // set starting values of email and password
      this.state = {
        email: "",
        password: ""
      };

      //hack to get access to the navigation from within the firebase.auth().onAuthStateChanged callback
      //global.navigation = this.props.navigation;
      const { navigation } = this.props; //pull navigation from the props into its own variable

      // figure it whether user is already logged-in
/*
      var user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log("User is signed in..");
        // go to dashboard
        this.props.navigation.navigate('Dashboard', {
          navigation: this.props.navigation
        });
      } else {
        console.log("No user is signed in!");
        // No user is signed in.
      }
*/

      // indicate what to do once the user signs in
      firebase.auth().onAuthStateChanged(function(user) {
        console.log("Auth state change...");
        if (user) {
          // user is signed in!
          console.log("Log in success for " + user.email + " (userId " + user.uid + ")!");
          //console.log(user);

          // navigate to the Dashboard view, passing the navigation property
          console.log("Navigating to Dashboard...");

          // switch to Dashboard component view
          navigation.navigate('Dashboard', {
            navigation: navigation
          });

        }
        else {
          // user logged out!
          console.log("User logged out!");
        }
      });

  } //constructor

  // method to log in via Firebase...
  // you should share a test email/password combo on your CONTRIBUTING.md document
  authenticate() {
    console.log("Authenticating...");

    // debug the current state
    //console.log(this.state);

    //try to sign in
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // if error, show an alert dialog with the error message displayed
      Alert.alert(
          'Log In Failed',
          error.message,
          [
              {text: "Ok, I'll fix this", onPress: () => console.log('Ok pressed')},
              {text: 'Whatever', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
          ],
          { cancelable: false }
      );
      //debug error
      console.log(error);
    });
  }

  //this method is called just before the component is inserted/mounted into the DOM
  componentWillMount() {
      console.log("Mounting...");

  } //componentWillMount


  //render the view for this component
  render() {
    console.log("Rendering...");

    //return a nicely-formatted JSX view
    return (
      <View style={styles.container}>

        <Image
          style={styles.bgImage}
          source={{ uri: global.happyGirlImgUrl }}
        />

        <Text
          style={{
          color: global.lightGrey,
          fontSize: 48,
          fontWeight: "bold",
          margin: 15,
          marginBottom: 40,
          }}>
            SMILE!
        </Text>

        <TextInput
            placeholder='Email'
            shake={true}
            placeholderTextColor={global.darkGrey}
            style= {styles.fieldText}
            onChangeText={(username) => this.setState({
                email: username
            })}
        />

        <TextInput
          placeholder='Password'
          placeholderTextColor={global.darkGrey}
          secureTextEntry={true}
          shake={true}
          style={styles.fieldText}
          onChangeText={(password) => this.setState({
            password: password
          })}
        />

        <Button
          title={"Sign in"}
          color={"#364652"}
          buttonStyle={styles.button}
          onPress={() => this.authenticate()}
        />

        <Text style={{
            color: global.lightGrey,
            margin: 15
          }}> or

        </Text>

        <Button
          title={"Sign up"}
          color={"#364652"}
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate('Signup', {navigation: this.props.navigation})}

        />

      </View>

    );
  }
}

export { Login };
