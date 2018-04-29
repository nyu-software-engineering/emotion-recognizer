import React from 'react';
import {StyleSheet, Text, View, Image, } from 'react-native';
import './global-design-constants.js';
//design imports
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

//console.log('firebase from Signup.js:',firebase);


const styles = StyleSheet.create({
  container: {
    backgroundColor: global.backgroundGreen,
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: global.darkGrey,
    textAlign: 'center',
    fontSize: 50,
    marginTop: 15,
    fontFamily: 'montserrat'
  },
  boldText: {
    color: global.starYellow,
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 10,
    fontFamily: 'montserrat-bold'
  },
  image: {
    borderColor: global.backgroundYellow,
    borderRadius: 10,
    borderWidth: 10,
    width: 300,
    height: 350,
    justifyContent: 'center',
    marginBottom: 1,
    marginTop: 15,
  },
  moreImagesButton: {
    backgroundColor: global.mainBlue,
    margin: 20,
    padding: 15,
    borderColor: global.transparent,
    borderWidth: 0,
    borderRadius: 5,
  },
   nextEmotSection: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 35
   },
   nextText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: global.darkGrey,
      fontFamily: 'open-sans'
   },
   nextButton: {
     width: 200,
     height: 40,
     backgroundColor: global.backgroundWhite,
     borderColor: global.transparent,
     borderWidth: 0,
     borderRadius: 5,
    },

});


class Onboarding1 extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "Learn Happy!"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.state = { uri: global.happyImgUrl };
        this.count = 0;
    } //constructor


    changePicture = () => {
    this.count++;
    if(this.count === 1) {
        this.setState({
            uri: global.happyImgUrl
        });
    }
    else if (this.count === 2) {
        this.setState({
            uri: global.happyImgUrl2
        });
    }
    else if (this.count === 3) {
        this.setState({
            uri: global.happyImgUrl3
        });
    }
    else if (this.count === 4) {
        this.setState({
            uri: global.happyImgUrl4
        });
    }
    else {
        this.setState({
            uri: global.happyImgUrl5
        });
        this.count = 0;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.headerText}>
            This is a
         </Text>
         <Text style={styles.boldText}>
            Happy face
         </Text>

        <Image
                source={this.state}
                style={styles.image}
            />
         <Button
            buttonStyle={styles.moreImagesButton}
            title="Touch here to see more faces!"
            color={global.starYellow}
            fontFamily='open-sans'
            onPress={() => this.changePicture(this.count)}>
        </Button>

        <View style={styles.nextEmotSection}>
           <Text style={styles.nextText}>Ready to move on?</Text>
           <Button
             buttonStyle={styles.nextButton}
             title="Next Emotion"
             color={global.mainBlue}
             fontFamily='open-sans'
             onPress={() => this.props.navigation.navigate('Onboarding2', {navigation: this.props.navigation})}
           />
       </View>

      </View>

    );
  }
}

export { Onboarding1 };
