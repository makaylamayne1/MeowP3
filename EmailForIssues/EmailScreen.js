import React, { useState } from "react";
import {
  ImageBackground,
  TextInput,
  Alert,
  Text,
  View,
  Button,
  StyleSheet,
} from "react-native";
import * as MailComposer from "expo-mail-composer";

//beautiful image of a city
const cityImage = {
  uri: "https://i.pinimg.com/564x/e4/e3/a2/e4e3a2e8636a31b00c161f03c4f1fb21.jpg",
};

//this is the code that will allow us to create a component and send an email complaint 
const EmailScreen = (props) => {
  [message, setMessage] = useState();

  //change the text
  onChangeHandler = (value) => {
    setMessage(value);
  };

  //Once the user has sent their email and comes back to the app it will give an alert stating that they will talk back to them soon 
  const talkLaterDialog = {
    text: "Okay",
    onPress: () =>
      Alert.alert(
        "We will message you back within 24 hours",
        "We will talk to you in a bit...",
        [
          {
            text: "Close",
          },
        ]
      ),
  };

  //This code automatically populates the email page with my "fake" email so users can quickly make a complaint 
  sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: ["makayla@gmail.com"],
        subject: "My subject line",
        body: message ,
      };
      Alert.alert(
        "Email",
        "We are now directing you to your email application",
        [talkLaterDialog],
        {
          cancelable: false,
        }
      );
      MailComposer.composeAsync(options).then((result) => {
        Alert.alert(result.status);
      });
    } else {
      Alert.alert("Email not available");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={cityImage} resizeMode="cover">
        <Text style={styles.text}>Please tell me the issue</Text>
        <TextInput
          style={styles.textInput}
          numberOfLines={10}
          onChangeText={onChangeHandler}
          placeHolder="Message goes here"
        />
        <Button title="Send Email" onPress={sendMessageWithEmail}></Button>
      </ImageBackground>
    </View>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 30,
  },
  textInput: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 19,
    opacity: 0.3,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
