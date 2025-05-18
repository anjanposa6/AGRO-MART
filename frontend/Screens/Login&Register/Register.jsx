// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { API_URL } from "@env";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./style";
// import Feather from "react-native-vector-icons/Feather";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Fontisto from "react-native-vector-icons/Fontisto";
// import Error from "react-native-vector-icons/MaterialIcons";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import Toast from "react-native-toast-message";
// import { RadioButton } from "react-native-paper";

// function RegisterPage({ props }) {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [nameVerify, setNameVerify] = useState(false);
//   const [email, setEmail] = useState("");
//   const [emailVerify, setEmailVerify] = useState(false);
//   const [mobile, setMobile] = useState("");
//   const [mobileVerify, setMobileVerify] = useState(false);
//   const [whatsapp, setWhatsapp] = useState("");
//   const [whatsappVerify, setWhatsappVerify] = useState(false);
//   const [password, setPassword] = useState("");
//   const [passwordVerify, setPasswordVerify] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userType, setUserType] = useState("User");
//   const [city, setCity] = useState("");

//   const navigation = useNavigation();

//   function handelSubmit() {
//     setLoading(true);
//     const userData = {
//       name,
//       email,
//       mobile,
//       whatsapp,
//       password,
//       userType,
//       city,
//     };

//     axios
//       .post(`${API_URL}/register`, userData)
//       .then((res) => {
//         if (res.data.status == "ok") {
//           // Alert.alert('Registered Successfully!!');
//           Toast.show({
//             type: "success",
//             text1: "Registration Successful ✅",
//             text2: "Your account has been created successfully!",
//             position: "top",
//             visibilityTime: 3000,
//           });

//           navigation.navigate("Login");
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Registration Failed ❌",
//             text2: "Something went wrong. Please try again.",
//             position: "top",
//             visibilityTime: 3000,
//           });

//           // Alert.alert(JSON.stringify(res.data));
//         }

//         setLoading(false);
//       })
//       .catch((e) => console.log(e));
//   }

//   function handleName(e) {
//     const nameVar = e.nativeEvent.text;
//     setName(nameVar);
//     setNameVerify(nameVar.length > 1);
//   }

//   function handleEmail(e) {
//     const emailVar = e.nativeEvent.text;
//     setEmail(emailVar);
//     setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
//   }

//   function handleMobile(e) {
//     const mobileVar = e.nativeEvent.text;
//     setMobile(mobileVar);
//     setMobileVerify(/[6-9]{1}[0-9]{9}/.test(mobileVar));
//   }

//   function handleWhatsapp(e) {
//     const whatsappVar = e.nativeEvent.text;
//     setWhatsapp(whatsappVar);
//     setWhatsappVerify(/[6-9]{1}[0-9]{9}/.test(whatsappVar));
//   }

//   function handlePassword(e) {
//     const passwordVar = e.nativeEvent.text;
//     setPassword(passwordVar);
//     setPasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar));
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={{ flexGrow: 1 }}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps={"always"}
//       style={{ backgroundColor: "white" }}
//     >
//       <View>
//         <View style={styles.registerContainer}>
//           <Image
//             style={styles.registerlogo}
//             source={require("../../assets/51889.jpg")}
//           />
//         </View>
//         <View style={styles.loginContainer}>
//           <Text style={styles.text_header}>Register!!!</Text>

//           <View style={styles.radioButton_div}>
//             <Text style={styles.radioButton_title}> Login as</Text>
//             <View style={styles.radioButton_inner_div}>
//               <Text style={styles.radioButton_text}>Consumer</Text>
//               <RadioButton
//                 value="User"
//                 status={userType == "User" ? "checked" : "unchecked"}
//                 onPress={() => setUserType("User")}
//               />
//             </View>
//             <View style={styles.radioButton_inner_div}>
//               <Text style={styles.radioButton_text}>Farmer</Text>
//               <RadioButton
//                 value="Admin"
//                 status={userType == "Admin" ? "checked" : "unchecked"}
//                 onPress={() => setUserType("Admin")}
//               />
//             </View>
//           </View>

//           <View style={styles.action}>
//             <FontAwesome
//               name="user-o"
//               color="#420475"
//               style={styles.smallIcon}
//             />
//             <TextInput
//               placeholder="Name"
//               style={styles.textInput}
//               onChange={(e) => handleName(e)}
//             />
//             {name.length < 1 ? null : nameVerify ? (
//               <Feather name="check-circle" color="green" size={20} />
//             ) : (
//               <Error name="error" color="red" size={20} />
//             )}
//           </View>
//           {name.length < 1 ? null : nameVerify ? null : (
//             <Text style={{ marginLeft: 20, color: "red" }}>
//               Name should be more than 1 character.
//             </Text>
//           )}

//           <View style={styles.action}>
//             <Fontisto
//               name="email"
//               color="#420475"
//               size={24}
//               style={{ marginLeft: 0, paddingRight: 5 }}
//             />
//             <TextInput
//               placeholder="Email"
//               style={styles.textInput}
//               onChange={(e) => handleEmail(e)}
//             />
//             {email.length < 1 ? null : emailVerify ? (
//               <Feather name="check-circle" color="green" size={20} />
//             ) : (
//               <Error name="error" color="red" size={20} />
//             )}
//           </View>
//           {email.length < 1 ? null : emailVerify ? null : (
//             <Text style={{ marginLeft: 20, color: "red" }}>
//               Enter a proper email address.
//             </Text>
//           )}

//           <View style={styles.action}>
//             <FontAwesome
//               name="mobile"
//               color="#420475"
//               size={35}
//               style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
//             />
//             <TextInput
//               placeholder="Mobile"
//               style={styles.textInput}
//               onChange={(e) => handleMobile(e)}
//               maxLength={10}
//             />
//             {mobile.length < 1 ? null : mobileVerify ? (
//               <Feather name="check-circle" color="green" size={20} />
//             ) : (
//               <Error name="error" color="red" size={20} />
//             )}
//           </View>
//           {mobile.length < 1 ? null : mobileVerify ? null : (
//             <Text style={{ marginLeft: 20, color: "red" }}>
//               Phone number should start with 6-9 and be followed by 9 digits.
//             </Text>
//           )}

//           <View style={styles.action}>
//             <FontAwesome
//               name="whatsapp"
//               color="#420475"
//               size={25}
//               style={{ paddingRight: 10, marginTop: -7, marginLeft: 0 }}
//             />
//             <TextInput
//               placeholder="WhatsApp Number"
//               style={styles.textInput}
//               onChange={(e) => handleWhatsapp(e)}
//               maxLength={10}
//             />
//             {whatsapp.length < 1 ? null : whatsappVerify ? (
//               <Feather name="check-circle" color="green" size={20} />
//             ) : (
//               <Error name="error" color="red" size={20} />
//             )}
//           </View>
//           {whatsapp.length < 1 ? null : whatsappVerify ? null : (
//             <Text style={{ marginLeft: 20, color: "red" }}>
//               WhatsApp number should start with 6-9 and be followed by 9 digits.
//             </Text>
//           )}

//           <View style={styles.action}>
//             <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
//             <TextInput
//               placeholder="Password"
//               style={styles.textInput}
//               onChange={(e) => handlePassword(e)}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               {password.length < 1 ? null : !showPassword ? (
//                 <Feather
//                   name="eye-off"
//                   style={{ marginRight: -10 }}
//                   color={passwordVerify ? "green" : "red"}
//                   size={23}
//                 />
//               ) : (
//                 <Feather
//                   name="eye"
//                   style={{ marginRight: -10 }}
//                   color={passwordVerify ? "green" : "red"}
//                   size={23}
//                 />
//               )}
//             </TouchableOpacity>
//           </View>
//           {password.length < 1 ? null : passwordVerify ? null : (
//             <Text style={{ marginLeft: 20, color: "red" }}>
//               Password should contain uppercase, lowercase, number, and be at
//               least 6 characters long.
//             </Text>
//           )}

//           <View style={styles.action}>
//             <FontAwesome
//               name="map-marker"
//               color="#420475"
//               style={styles.smallIcon}
//             />
//             <Picker
//               selectedValue={city}
//               style={styles.picker}
//               onValueChange={(itemValue) => setCity(itemValue)}
//               placeholder="Select City"
//             >
//               <Picker.Item label="Select City" value="" />
//               <Picker.Item label="Nellore" value="Nellore" />
//               <Picker.Item label="Gudur" value="Gudur" />
//               <Picker.Item label="Tirupathi" value="Tirupathi" />
//               <Picker.Item label="Vijaywada" value="Vijaywada" />
//               <Picker.Item label="Guntur" value="Guntur" />
//               {/* Add more cities as needed */}
//             </Picker>
//           </View>
//         </View>
//         <View style={styles.button}>
//           <TouchableOpacity style={styles.inBut} onPress={() => handelSubmit()}>
//             <View>
//               {loading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.textSign}>Register</Text>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default RegisterPage;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Error from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { RadioButton } from "react-native-paper";

function RegisterPage({ props }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappVerify, setWhatsappVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("User");
  const [city, setCity] = useState("");

  const navigation = useNavigation();

  function handelSubmit() {
    setLoading(true);
    const userData = {
      name,
      email,
      mobile,
      whatsapp,
      password,
      userType,
      city,
    };

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "ok") {
          // Success
          Toast.show({
            type: "success",
            text1: "Registration Successful ✅",
            text2: "Your account has been created successfully!",
            position: "top",
            visibilityTime: 3000,
          });

          navigation.navigate("Login");
        } else {
          // Failure
          Toast.show({
            type: "error",
            text1: "Registration Failed ❌",
            text2: "Something went wrong. Please try again.",
            position: "top",
            visibilityTime: 3000,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "Network Error ❌",
          text2: "Failed to communicate with the server.",
          position: "top",
          visibilityTime: 3000,
        });
        setLoading(false);
      });
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(nameVar.length > 1);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text;
    setMobile(mobileVar);
    setMobileVerify(/[6-9]{1}[0-9]{9}/.test(mobileVar));
  }

  function handleWhatsapp(e) {
    const whatsappVar = e.nativeEvent.text;
    setWhatsapp(whatsappVar);
    setWhatsappVerify(/[6-9]{1}[0-9]{9}/.test(whatsappVar));
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar));
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"}
      style={{ backgroundColor: "white" }}
    >
      <View>
        <View style={styles.registerContainer}>
          <Image
            style={styles.registerlogo}
            source={require("../../assets/51889.jpg")}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Register!!!</Text>

          <View style={styles.radioButton_div}>
            <Text style={styles.radioButton_title}> Login as</Text>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Consumer</Text>
              <RadioButton
                value="User"
                status={userType == "User" ? "checked" : "unchecked"}
                onPress={() => setUserType("User")}
              />
            </View>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Farmer</Text>
              <RadioButton
                value="Admin"
                status={userType == "Admin" ? "checked" : "unchecked"}
                onPress={() => setUserType("Admin")}
              />
            </View>
          </View>

          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              onChange={(e) => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              Name should be more than 1 character.
            </Text>
          )}

          <View style={styles.action}>
            <Fontisto
              name="email"
              color="#420475"
              size={24}
              style={{ marginLeft: 0, paddingRight: 5 }}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChange={(e) => handleEmail(e)}
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              Enter a proper email address.
            </Text>
          )}

          <View style={styles.action}>
            <FontAwesome
              name="mobile"
              color="#420475"
              size={35}
              style={{ paddingRight: 10, marginTop: -7, marginLeft: 5 }}
            />
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              onChange={(e) => handleMobile(e)}
              maxLength={10}
            />
            {mobile.length < 1 ? null : mobileVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {mobile.length < 1 ? null : mobileVerify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              Phone number should start with 6-9 and be followed by 9 digits.
            </Text>
          )}

          <View style={styles.action}>
            <FontAwesome
              name="whatsapp"
              color="#420475"
              size={25}
              style={{ paddingRight: 10, marginTop: -7, marginLeft: 0 }}
            />
            <TextInput
              placeholder="WhatsApp Number"
              style={styles.textInput}
              onChange={(e) => handleWhatsapp(e)}
              maxLength={10}
            />
            {whatsapp.length < 1 ? null : whatsappVerify ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : (
              <Error name="error" color="red" size={20} />
            )}
          </View>
          {whatsapp.length < 1 ? null : whatsappVerify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              WhatsApp number should start with 6-9 and be followed by 9 digits.
            </Text>
          )}

          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={(e) => handlePassword(e)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{ marginRight: -10 }}
                  color={passwordVerify ? "green" : "red"}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              Password should contain uppercase, lowercase, number, and be at
              least 6 characters long.
            </Text>
          )}

          <View style={styles.action}>
            <FontAwesome
              name="map-marker"
              color="#420475"
              style={styles.smallIcon}
            />
            <Picker
              selectedValue={city}
              style={styles.picker}
              onValueChange={(itemValue) => setCity(itemValue)}
              placeholder="Select City"
            >
              <Picker.Item label="Select City" value="" />
              <Picker.Item label="Nellore" value="Nellore" />
              <Picker.Item label="Gudur" value="Gudur" />
              <Picker.Item label="Tirupathi" value="Tirupathi" />
              <Picker.Item label="Vijaywada" value="Vijaywada" />
              <Picker.Item label="Guntur" value="Guntur" />
              {/* Add more cities as needed */}
            </Picker>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handelSubmit()}>
            <View>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textSign}>Register</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default RegisterPage;
