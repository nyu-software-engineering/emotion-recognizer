import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import './global-design-constants.js';
//design imports
import { Button} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
//GameDriver import
import { GameDriver } from './GameDriver.js';

const testData = [
  {
    name: 'happy',
    imgs: [global.happyImgUrl, global.happyImgUrl2, global.happyImgUrl3, global.happyImgUrl4, global.happyImgUrl5]
  },
  {
    name: 'sad',
    imgs: [global.sadImgUrl, global.sadImgUrl2, global.sadImgUrl3, global.sadImgUrl4, global.sadImgUrl5]
  }
];

//console.log('firebase from Signup.js:',firebase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderColor: global.white,
    borderRadius: 10,
    borderWidth: 10,
    width: 300,
    height: 350,
    justifyContent: 'center',
    marginBottom: 1,
    marginTop: 15,
  },
  bgImage: {
     backgroundColor: global.lightGreySemiTransparent,
     flex: 1,
     position: 'absolute',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
   },
   answerArea: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 20
   },
   answerButton: {
     backgroundColor: global.mainBlue,
     marginTop: 20,
     width: 130,
     borderColor: global.transparent,
     borderWidth: 0,
     borderRadius: 5,
   },
});

class SmileGame extends React.Component {
    //set up the title of this screen
    static navigationOptions = {
        title: "SmileGame"
    };

    //this constructor method is called before the componentWillMount method
    //use it to set up the starting state of the component
    constructor(props) {
        super(props); // call the parent class's (React.Component) constructor first before anything else
        this.count = 0;
        this.driver = new GameDriver( testData, 5, 'happy vs sad' );
        const firstQuestion = this.driver.getQuestion( this.count );
        this.state = { uri: firstQuestion.img, emotionPrompt: firstQuestion.emotion };
    } //constructor


    changePicture = () => {
      if ( !this.driver.gameOver() ) {
        this.count++;

        const currentQuestion = this.driver.getQuestion( this.count );

        this.setState({
            uri: currentQuestion.img,
            emotionPrompt: currentQuestion.emotion
        });
      }
      else {
        this.driver.reportAnswers();
        this.props.navigation.navigate('Congratulations2', {navigation: this.props.navigation});
      }
  }

  render() {
    return (
      <View style={styles.container}>

         <Image
             style={styles.bgImage}
             source={{ uri: global.orangeSkyImgUrl }}
           />

        <Text style={styles.headerText}>
               Is this person
        </Text>
        <Text style={styles.boldText}>
           {this.state.emotionPrompt}?
        </Text>
        <Image
          source={{uri: this.state.uri}}
          style={styles.image}
         />

         <View style={styles.answerArea}>
            <Button
               buttonStyle={styles.answerButton}
               title="YES"
               color={global.starYellow}
               fontFamily='open-sans-bold'
               onPress={ () => {
                   this.driver.setAnswer( this.count, true );
                   this.changePicture();
                }
               }
            >
            </Button>
            <Button
               buttonStyle={styles.answerButton}
               title="NO"
               color={global.starYellow}
               fontFamily='open-sans-bold'
               onPress={ () => {
                   this.driver.setAnswer( this.count, false );
                   this.changePicture();
                }
               }
            >
            </Button>
         </View>

      </View>

    );
  }
}

export { SmileGame };
