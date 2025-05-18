// const {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator
// } = require('react-native');
// import { API_URL } from '@env';
// // console.log(API_URL);
// import Toast from 'react-native-toast-message';
// import {useNavigation} from '@react-navigation/native';
// import styles from './style';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {useEffect, useState} from 'react';
// // import {log} from 'react-native-reanimated';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function LoginPage({props}) {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   function handleSubmit() {
//     setLoading(true);
//     console.log(email, password);
//     const userData = {
//       email: email,
//       password,
//     };
//     console.log("login hii")

//     axios.post(`${API_URL}/login-user`, userData).then(res => {

//       console.log(res.data);
//       if (res.data.status == 'ok') {
//         // Alert.alert('Logged In Successfull');
//         Toast.show({
//           type: 'success',
//           text1: `Hello ${res.data.name}`,
//           text2: 'Login is successful  👋'
//         });

//         console.log(res.data.data)
//         AsyncStorage.setItem('token', res.data.data);
//         AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
//         AsyncStorage.setItem('userType',res.data.userType)
//         AsyncStorage.setItem('userEmail',res.data.email)
//         // navigation.navigate('Home');
//         if(res.data.userType=="Admin"){
//            navigation.navigate('HomeScreen');
//         }else{
//           navigation.navigate('Farmer');
//         }

//       }else{
//         // Alert.alert("User doesn't exist");
//         Toast.show({
//           type: 'error',
//           text1: 'Login Failed',
//           text2: 'Invalid credentials. Please try again.',
//           position: 'top',
//           visibilityTime: 3000,
//         });
//       }
//       // finally {
//         setLoading(false);

//     });
//   }
//   async function getData() {
//     const data = await AsyncStorage.getItem('isLoggedIn');

//     console.log(data, 'at app.jsx');

//   }
//   useEffect(()=>{
//     getData();
//     console.log("Hii");
//   },[])

//   return (
//     <ScrollView
//       contentContainerStyle={{flexGrow: 1}}
//       keyboardShouldPersistTaps={'always'}>
//       <View style={{backgroundColor: 'white'}}>
//         <View style={styles.logoContainer}>
//           <Image
//             style={styles.logo}
//             source={require('../../assets/Farmer.jpg')}
//           />
//         </View>
//         <View style={styles.loginContainer}>
//           <Text style={styles.text_header}>Login !!!</Text>
//           <View style={styles.action}>
//             <FontAwesome
//               name="user-o"
//               color="#420475"
//               style={styles.smallIcon}
//             />
//             <TextInput
//               placeholder="Mobile or Email"
//               style={styles.textInput}
//               onChange={e => setEmail(e.nativeEvent.text)}
//             />
//           </View>
//           <View style={styles.action}>
//             <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
//             <TextInput
//               placeholder="Password"
//               style={styles.textInput}
//               onChange={e => setPassword(e.nativeEvent.text)}
//             />
//           </View>
//           <View
//             style={{
//               justifyContent: 'flex-end',
//               alignItems: 'flex-end',
//               marginTop: 8,
//               marginRight: 10,
//             }}>
//             <Text style={{color: '#420475', fontWeight: '700'}}>
//               Forgot Password
//             </Text>
//           </View>
//         </View>
//         <View style={styles.button}>
//           <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
//             <View>

//                {loading ? (
//                                       <ActivityIndicator size="small" color="#fff" />
//                                     ) : (
//                                       <Text style={styles.textSign}>Log in</Text>
//                                     )}

//             </View>
//           </TouchableOpacity>

//           <View style={{padding: 15}}>
//             <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
//               ----Or Continue as----
//             </Text>
//           </View>
//           <View style={styles.bottomButton}>
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity style={styles.inBut2}>
//                 <FontAwesome
//                   name="user-circle-o"
//                   color="white"
//                   style={styles.smallIcon2}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.bottomText}>Guest</Text>
//             </View>
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity
//                 style={styles.inBut2}
//                 onPress={() => {
//                   navigation.navigate('Register');
//                 }}>
//                 <FontAwesome
//                   name="user-plus"
//                   color="white"
//                   style={[styles.smallIcon2, {fontSize: 30}]}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.bottomText}>Sign Up</Text>
//             </View>
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity
//                 style={styles.inBut2}
//                 onPress={() => alert('Coming Soon')}>
//                 <FontAwesome
//                   name="google"
//                   color="white"
//                   style={[styles.smallIcon2, {fontSize: 30}]}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.bottomText}>Google</Text>
//             </View>
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity
//                 style={styles.inBut2}
//                 onPress={() => alert('Coming Soon')}>
//                 <FontAwesome
//                   name="facebook-f"
//                   color="white"
//                   style={[styles.smallIcon2, {fontSize: 30}]}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.bottomText}>Facebook</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
// export default LoginPage;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginPage({ props }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  function handleSubmit() {
    setLoading(true);
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };
    console.log("login hii");

    fetch(`${API_URL}/login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.email);
        if (res.status === "ok") {
          // Alert.alert('Logged In Successfully');
          console.log(res.data);
          Toast.show({
            type: "success",
            text1: `Hello ${res.name}`,
            text2: "Login is successful  👋",
          });
          AsyncStorage.setItem("token", res.data);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.userType);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.data.userType);
          AsyncStorage.setItem("userEmail", res.email);
          console.log(res.data.email);

          if (res.userType === "Admin") {
            navigation.navigate("HomeScreen");
          } else {
            navigation.navigate("Farmer");
          }
        } else {
          // Alert.alert('Login Failed', res.message || 'Invalid credentials');
          //         // Alert.alert("User doesn't exist");
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: "Invalid credentials. Please try again.",
            position: "top",
            visibilityTime: 3000,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        // Alert.alert('Login Failed', 'An error occurred. Please try again.');
      });
  }

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data, "at app.jsx");
  }

  useEffect(() => {
    getData();
    console.log("Hii");
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/Farmer.jpg")}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Mobile or Email"
              style={styles.textInput}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              secureTextEntry
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 8,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#420475", fontWeight: "700" }}>
              Forgot Password
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textSign}>Log in</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={{ padding: 15 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#919191" }}
            >
              ----Or Continue as----
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.inBut2}>
                <FontAwesome
                  name="user-circle-o"
                  color="white"
                  style={styles.smallIcon2}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Guest</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert("Coming Soon")}
              >
                <FontAwesome
                  name="google"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Google</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => alert("Coming Soon")}
              >
                <FontAwesome
                  name="facebook-f"
                  color="white"
                  style={[styles.smallIcon2, { fontSize: 30 }]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Facebook</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginPage;
