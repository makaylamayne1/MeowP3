import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Alert,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import * as SMS from "expo-sms";

//this component will allow users to make a complaint about the application via sms 
const SendSMS = (props) => {
  //beautiful image of a city
  const cityImage = {
    uri: "https://i.pinimg.com/564x/e4/e3/a2/e4e3a2e8636a31b00c161f03c4f1fb21.jpg",
  };
  [message, setMessage] = useState();

  //change the text
  onChangeHandler = (value) => {
    setMessage(value);
  };

  //after the user comes back to the app they will see this alert stating we will message back soon
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

  //send the message via sms
  sendMessageWithSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["5198720660", "3039289302"],
        message
      );
      Alert.alert(
        "SMS Sent!",
        "Your SMS has been sent successfully!",
        [talkLaterDialog],
        {
          cancelable: false,
        }
      );
    } else {
      Alert.alert("Error sending: SMS is not available");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={cityImage} resizeMode="cover">
        <Text style={styles.text}>Please Tell me your issue</Text>
        <TextInput
          style={styles.textInput}
          numberOfLines={10}
          onChangeText={onChangeHandler}
          placeHolder="Message goes here"
        />
        <Button title="Send SMS" onPress={sendMessageWithSMS}></Button>
      </ImageBackground>
    </View>
  );
};

export default SendSMS;

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
