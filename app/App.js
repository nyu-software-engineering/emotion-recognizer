import React from 'react';

//routing boilerplate
import { StackNavigator } from 'react-navigation';

//view imports
import { Login as LoginScreen } from './Login';
import { Signup as SignupScreen } from './Signup';
import { Onboarding1 as Onboarding1Screen} from './Onboarding1';
import { Onboarding2 as Onboarding2Screen} from './Onboarding2';
import { Congratulations as CongratulationsScreen} from './Congratulations';
//import our global design settings
import './global-design-constants.js';

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Login',
        }),
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Sign Up',
        }),
    },
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: ({ navigation }) => ({
          title: 'Dashboard',
        }),
    },
    Onboarding1: {
      screen: Onboarding1Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding1',
        }),
    },
    Onboarding2: {
      screen: Onboarding2Screen,
      navigationOptions: ({ navigation }) => ({
          title: 'Onboarding2',
        }),
    },
    Congratulations: {
      screen: CongratulationsScreen,
    },
  },
  {
    //load up the Login component by default
    initialRouteName: 'Congratulations',
  }
);

//handle fonts
import { AppLoading, Font } from 'expo';

export default class App extends React.Component {

  //this constructor method is called before the componentWillMount method
  //use it to set up the starting state of the component
  constructor(props) {
    super(props); // call the parent class's (React.Component) constructor first before anything else

    this.state = {
      isReady: false
    };

  } //constructor

  //this method is called just before the component is inserted/mounted into the DOM
  componentWillMount() {
    (async function() {

      //load all the fonts defined in global-design-constants.js
      await Font.loadAsync(global.fonts);

      //set the initial state of this component
      this.setState({
        isReady: true
      });

    })();

  } //componentWillMount

  //render this component's View onto the screen
  render() {

    // if this componenet is not ready to be displayed, return a loading View
    if (!this.state.isReady) {
      //return the Expo app's default AppLoading view
      return <AppLoading />;
    }

    // otherwise, show the Login component, which is the default in the RootStack
    return (
      /*<Text style={{marginTop: 30}}>
      This is not a drill!
      </Text>*/

      <RootStack />
    );
  }

}
