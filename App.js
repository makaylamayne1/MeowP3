import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import {db,auth} from "./firebase-config";
import { useState } from "react";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import firebase from './firebase-config'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioPlayAndShow from "./AudioForMP3/audio";
import EmailScreen from "../makaylasproject2/EmailForIssues/EmailScreen";
import SendSMS from "./ReportViaPhone/SendSMS";

//import Register from './authentication/reg';
//import Login1 from './authentication/log';

const Stack = createNativeStackNavigator();



export default function App() {

  
  //get the data from the database
  
  const docRef = db.collection("users").doc("userid");

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Proof the database works. UserId:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

 



  //Whether or not to show audip screen
  const [store, setStore] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  //IMAGES
  const threeCuteCats = {
    uri: "https://i.pinimg.com/564x/e6/89/47/e689476d68157a3b33961489db179a81.jpg",
  };
  //have a username (log in)
  const [username, setUsername] = useState();
  //have a password that updates too
  const [password, setPassword] = useState();
  //set an email
  const [registerEmail, setRegisterEmail] = useState();
  //set a password
  const [registerPass, setRegisterPass] = useState();

  const userInputHandler = (value) => {
    setUsername(value);
  };

  const passwordInputHandler = (value) => {
    setPassword(value);
  };

  const registerEmailInputHandler = (value) => {
    setRegisterEmail(value);
  };

  const registerPasswordInputHandler = (value) => {
    setRegisterPass(value);
  };

  //to add the data to the database

  //functionality to register
  const registerme = async () => {
    try{
      await auth.createUserWithEmailAndPassword(registerEmail, registerPass)
        console.log('Works');
        //save to the database 
        try{
          db.collection("users").add({
               username: registerEmail,
               password :registerPass
             }
           )
           console.log('Added data to the database')
          }catch(error){
               console.error("Error adding document: ", error);
             };

        Alert.alert("Thanks for signing up!");
   
        // ...
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
        Alert.alert(errorMessage);
        // ..
      };
  };

  const loginme = async () => {
    try {
      await auth.signInWithEmailAndPassword(username, password);
      console.log("Working?!");
      setShowAudio(true);
      Alert.alert("Welcome " + username + "!!");
    } catch (error) {
      console.log("Something wrong with login" + error.message);
    }
  };

  //RENDERING IS BELOW FUNCTIONALITY IS ABOVE
  //Rendering  to log in
  function Login({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={threeCuteCats}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.text}>Login</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={userInputHandler}
            value={username}
          />
          <Text style={styles.text}>Login Password</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            onChangeText={passwordInputHandler}
            value={password}
          />
          <Button
            style={styles.text}
            title="Login"
            onPress={() => {
              loginme();
              if (showAudio == true) {
                console.log(
                  "Now showing AudioPlandAndShow where you can listen to the noises of cats"
                );
                navigation.navigate("AudioPlayAndShow");
              }
            }}
          />
          <Button
            style={styles.text}
            title="Go back and register again"
            onPress={() => {
              navigation.navigate(Register);
            }}
          />
          <Pressable style={styles.button2} title="Go to Login">
            <Text
              style={styles.text}
              onPress={() => {
                Alert.alert("Sorry that you may be having issues.");
                navigation.navigate(EmailScreen);
              }}
            >
              Report an issue via email
            </Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            title="Go to Login"
            onPress={() => {
              navigation.navigate(Login);
            }}
          >
            <Text
              style={styles.text}
              onPress={() => {
                Alert.alert("Sorry that you may be having issues.");
                navigation.navigate(SendSMS);
              }}
            >
              Report an issue via phone
            </Text>
          </Pressable>
        </ImageBackground>
      </View>
    );
  }

  //Register screen Rendering
  function Register({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={threeCuteCats}
          resizeMode="cover"
          style={styles.image}
        >
          <Text>MeowP3</Text>
          <Text style={styles.text}>Register Username</Text>
          <TextInput
            style={styles.input}
            value={registerEmail}
            onChangeText={(v) => registerEmailInputHandler(v)}
          />
          <Text style={styles.text}>Register Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(v) => registerPasswordInputHandler(v)}
            value={registerPass}
          />
          <StatusBar style="auto" />
          <Pressable
            style={styles.button}
            title="Register"
            onPress={registerme}
          >
            <Text style={styles.text}>SignUp</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            title="Go to Login"
            onPress={() => {
              setUsername(null);
              setPassword(null);
              navigation.navigate(Login);
            }}
          >
            <Text style={styles.text}>I Already have an Account</Text>
          </Pressable>
        </ImageBackground>
      </View>
    );
  }

  //From lines 244 and 253 create stack screens that will allow us to navigate to different pages in our application
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AudioPlayAndShow" component={AudioPlayAndShow} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="SendSMS" component={SendSMS} />
      </Stack.Navigator>
    </NavigationContainer>
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
    opacity: 0.5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "pink",
    opacity: 0.7,
  },
  button2: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    backgroundColor: "green",
    opacity: 0.7,
    borderRadius: 20,
  },
  text: {
    fontSize: 25,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: 20,
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 18,
    alignItems: "center",
  },
});
