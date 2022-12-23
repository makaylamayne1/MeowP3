import { Audio } from "expo-av";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import * as React from "react";
import * as Speech from "expo-speech";

//This is the component to play the sounds of cats 
export default function AudioPlayAndShow() {
  const threeCuteCats = {
    uri: "https://i.pinimg.com/564x/3f/d3/e4/3fd3e4e46c4db32a5f5ea09ef9ca6a4a.jpg",
  };
  //audio files
  async function playSound1() {
    await Audio.setAudioModeAsync({
      // set to false to play through speaker (instead of headset)
      allowsRecordingIOS: false,
      interruptionModeIOS: (Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX = 0),
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: (Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1),
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/c1.mp3"));
      await soundObject.setStatusAsync({ isLooping: false });
      await soundObject.playAsync();
      console.log("we are playing the recording!");
      // await soundObject.unloadAsync();
    } catch (error) {
      console.log("An error occurred on playback:");
      console.log(error);
    }
  }

  async function playSound2() {
    await Audio.setAudioModeAsync({
      // set to false to play through speaker (instead of headset)
      allowsRecordingIOS: false,
      interruptionModeIOS: (Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX = 0),
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: (Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1),
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/c2.mp3"));
      await soundObject.setStatusAsync({ isLooping: false });
      await soundObject.playAsync();
      console.log("we are playing the recording!");
      // await soundObject.unloadAsync();
    } catch (error) {
      console.log("An error occurred on playback:");
      console.log(error);
    }
  }

  async function playSound3() {
    await Audio.setAudioModeAsync({
      // set to false to play through speaker (instead of headset)
      allowsRecordingIOS: false,
      interruptionModeIOS: (Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX = 0),
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: (Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1),
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/c3.mp3"));
      await soundObject.setStatusAsync({ isLooping: false });
      await soundObject.playAsync();
      console.log("we are playing the recording!");
      // await soundObject.unloadAsync();
    } catch (error) {
      console.log("An error occurred on playback:");
      console.log(error);
    }
  }

  //This uses the text to speech api
  const speak = () => {
    Speech.speak(
      "The reason I created this app is due to the fact that it is an assignment in which we have to show what we learnt to our instructor"
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={threeCuteCats}
        resizeMode="cover"
        style={styles.image}
      >
        <Pressable
          style={styles.button}
          onPress={() => {
            playSound1();
          }}
        >
          <Text>Fluffy</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            playSound2();
          }}
        >
          <Text>Chester</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            playSound3();
          }}
        >
          <Text>Blacky plays with his ball</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={speak}>
          <Text>what is the purpose of this</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  image1: {
    width: 300,
    height: 276,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "pink",
    marginBottom: "10%",
    opacity: 0.5,
  },
  text: {
    fontSize: 40,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
