
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import { API_URL } from '@env';
// import { Avatar } from 'react-native-paper';
// import styles from './stylesProfileEdit';
// import Back from 'react-native-vector-icons/Ionicons';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { useNavigation, CommonActions } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function Profile() {
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [whatsapp, setWhatsapp] = useState('');
//   const [city, setCity] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await axios.post(`${API_URL}/userdata`, { token });
//         if (response.data.status === 'Ok') {
//           const userData = response.data.data;
//           console.log(userData);
//           setEmail(userData.email);
//           setCity(userData.city);
//           setImage(userData.image);
//           setWhatsapp(userData.whatsapp);
//           setName(userData.name);
//           setMobile(userData.mobile);
//         } else {
//           console.error('Failed to fetch user data:', response.data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       // Remove the authToken from AsyncStorage
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('isLoggedIn');
//       await AsyncStorage.removeItem('userType');
//       console.log("success");
//       Toast.show({
//         type: 'info',
//         text1: 'Logged Out',
//         text2: 'You have successfully logged out.',
//         position: 'top',
//         visibilityTime: 2000,
//       });
      

//       // Reset the navigation to the Login screen
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         })
//       );
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const selectPhoto = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [5, 5],
//       quality: 0.5,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
//       setImage(base64Image);
//     } else {
//       console.log("Image selection was canceled.");
//     }
//   };

//   const uploadImageToCloudinary = async (base64Image) => {
//     const CLOUD_NAME = 'dvh2r5vcl'; // Replace with your Cloudinary cloud name
//     const UPLOAD_PRESET = 'mystore'; // Replace with your Cloudinary upload preset

//     const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
//       file: base64Image,
//       upload_preset: UPLOAD_PRESET,
//     });

//     return response.data.secure_url; // Return the URL of the uploaded image
//   };

//   const updateProfile = async () => {
//     setLoading(true);
//     try {
//       // Upload image to Cloudinary
//       const imageUrl = await uploadImageToCloudinary(image);

//       const formdata = {
//         name,
//         image: imageUrl, // Use the Cloudinary URL
//         email,
//         mobile,
//         whatsapp,
//         city,
//       };

//       console.log("Form Data:", formdata);

//       const res = await axios.post(`${API_URL}/update-user`, formdata);
//       console.log(res.data);
//       if (res.data.status === "Ok") {
//         Toast.show({
//           type: 'info',
//           text1: 'Profile Updated ✅',
//           text2: 'Your profile details have been saved.',
//           position: 'top',
//           visibilityTime: 2000,
//         });
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Profile Update Failed ❌',
//           text2: 'Something went wrong. Please try again.',
//           position: 'top',
//           visibilityTime: 2000,
//         });
        
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Could not update profile',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView
//       keyboardShouldPersistTaps={'always'}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 40 }}>
//       <View>
//         <View style={styles.header}>
//           <View style={{ flex: 1 }}>
//             <Back name="arrow-back" size={30} style={styles.backIcon} />
//           </View>
//           <View style={{ flex: 3 }}>
//             <Text style={styles.nameText}>Profile</Text>
//           </View>
//           <View style={{ flex: 1 }}></View>
//         </View>
//         <View style={styles.camDiv}>
//           <View style={styles.camIconDiv}>
//             <Back name="camera" size={22} style={styles.cameraIcon} />
//           </View>

//           <TouchableOpacity onPress={selectPhoto}>
//             <Avatar.Image
//               size={140}
//               style={styles.avatar}
//               source={{
//                 uri: image || 'https://example.com/default-avatar.png', // Set a default image if no image selected
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={{ marginTop: 50, marginHorizontal: 22 }}>
//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Name</Text>
//             <TextInput
//               placeholder="Your Name"
//               placeholderTextColor={'#999797'}
//               style={styles.infoEditSecond_text}
//               onChangeText={setName}
//               value={name}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Email</Text>
//             <TextInput
//               editable={false}
//               placeholder="Your Email"
//               placeholderTextColor={'#999797'}
//               style={styles.infoEditSecond_text}
//               value={email}
//             />
//           </View>
//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>WhatsApp Number</Text>
//             <TextInput
//             editable={false}
//               placeholder="WhatsApp No"
//               placeholderTextColor={'#999797'}
//               keyboardType="default"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setWhatsapp}
//               value={whatsapp}
//             />
//           </View>
//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>City</Text>
//             <TextInput
//             // editable={false}
//               placeholder="City"
//               placeholderTextColor={'#999797'}
//               keyboardType="default"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setCity}
//               value={city}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Mobile No</Text>
//             <TextInput
//               // editable={false}
//               placeholder="Your Mobile No"
//               placeholderTextColor={'#999797'}
//               keyboardType="numeric"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setMobile}
//               value={mobile}
//             />
//           </View>
//         </View>

//         <View style={styles.button}>
//           <TouchableOpacity
//             onPress={updateProfile}
//             style={styles.inBut}>
//             <View>
//               {loading ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.textSign}>Update Profile</Text>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.button}>
//           <TouchableOpacity
//             onPress={handleLogout}
//             style={[styles.inBut, { backgroundColor: 'red' }]}>
//             <View>
//               <Text style={styles.textSign}>Logout</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default Profile;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { API_URL } from '@env';
import { Avatar } from 'react-native-paper';
import styles from './stylesProfileEdit';
import Back from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${API_URL}/userdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.status === 'Ok') {
          const userData = data.data;
          console.log(userData);
          setEmail(userData.email);
          setCity(userData.city);
          setImage(userData.image);
          setWhatsapp(userData.whatsapp);
          setName(userData.name);
          setMobile(userData.mobile);
        } else {
          console.error('Failed to fetch user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userType');
      console.log("success");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const selectPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(base64Image);
    } else {
      console.log("Image selection was canceled.");
    }
  };

  const uploadImageToCloudinary = async (base64Image) => {
    const CLOUD_NAME = 'dvh2r5vcl'; // Replace with your Cloudinary cloud name
    const UPLOAD_PRESET = 'mystore'; // Replace with your Cloudinary upload preset

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64Image,
        upload_preset: UPLOAD_PRESET,
      }),
    });
    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(image);

      const formdata = {
        name,
        image: imageUrl,
        email,
        mobile,
        whatsapp,
        city,
      };

      console.log("Form Data:", formdata);

      const response = await fetch(`${API_URL}/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const res = await response.json();
      console.log(res);
      if (res.status === "Ok") {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Profile Update Failed',
          text2: res.message || 'An error occurred',
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Back name="arrow-back" size={30} style={styles.backIcon} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.nameText}>Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.camDiv}>
          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={selectPhoto}>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri: image || 'https://example.com/default-avatar.png',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 50, marginHorizontal: 22 }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Name</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Email</Text>
            <TextInput
              editable={false}
              placeholder="Your Email"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              value={email}
            />
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>WhatsApp Number</Text>
            <TextInput
              editable={false}
              placeholder="WhatsApp No"
              placeholderTextColor={'#999797'}
              keyboardType="default"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChangeText={setWhatsapp}
              value={whatsapp}
            />
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>City</Text>
            <TextInput
              placeholder="City"
              placeholderTextColor={'#999797'}
              keyboardType="default"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChangeText={setCity}
              value={city}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChangeText={setMobile}
              value={mobile}
            />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={updateProfile}
            style={styles.inBut}>
            <View>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.textSign}>Update Profile</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.inBut, { backgroundColor: 'red' }]}>
            <View>
              <Text style={styles.textSign}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;




