// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import { Avatar } from 'react-native-paper';
// import styles from './Screens/UpdateProfile/stylesProfileEdit';
// import Back from 'react-native-vector-icons/Ionicons';
// import { RadioButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// function AddProduct() {
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [unit, setUnit] = useState('');
//   // const [token, setToken] = useState('');
//   const route = useRoute();
//   const token = AsyncStorage.getItem('token');
//   console.log(token)
//   const navigation = useNavigation();

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

//   const Addproduct = async () => {
//     try {
//       // Retrieve the token from AsyncStorage
//       const token = await AsyncStorage.getItem('token');
      
//       if (!token) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Token is missing. Please log in again.',
//         });
//         return; // Stop the function if the token is not found
//       }

//       if (!image || !name || !price || !quantity || !unit) {
//         Toast.show({
//           type: 'error',
//           text1: 'Validation Error',
//           text2: 'All fields are required.',
//         });
//         return; // Stop the function if any field is empty
//       }
//       // navigation.navigate('Home');
  
//       // Upload image to Cloudinary
//       const imageUrl = await uploadImageToCloudinary(image);
  
//       const formdata = {
//         name,
//         image: imageUrl, // Use the Cloudinary URL
//         price,
//         quantity,
//         unit,
//         token, // Include the token
//       };

//       console.log("Form Data:", formdata);

//       const res = await axios.post('http://192.168.9.186:5000/add-product', formdata);
//       console.log(res.data);
//       navigation.navigate('Home');
//       if (res.data.status === "Ok") {
//         console.log("Home")
//         navigation.navigate('Home');

//         Toast.show({
//           type: 'success',
//           text1: 'Profile Updated Successfully',
//         });
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Profile Update Failed',
//           text2: res.data.message || 'An error occurred',
//         });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Could not update profile',
//       });
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
//             <Text style={styles.nameText}>Add product</Text>
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
//             <Text style={styles.infoEditFirst_text}>Product Name</Text>
//             <TextInput
//               placeholder="Product Name"
//               placeholderTextColor={'#999797'}
//               style={styles.infoEditSecond_text}
//               onChangeText={setName}
//               value={name}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Price</Text>
//             <TextInput
//             //   editable={false}
//               placeholder="Price"
//               placeholderTextColor={'#999797'}
//               onChangeText={setPrice}
//               style={styles.infoEditSecond_text}
//               value={price}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Units</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <View style={styles.radioView}>
//                 <Text style={styles.radioText}>Kg</Text>
//                 <RadioButton
//                   value="Kg"
//                   status={unit === 'Kg' ? 'checked' : 'unchecked'}
//                   onPress={() => setUnit('Kg')}
//                 />
//               </View>
//               <View style={styles.radioView}>
//                 <Text style={styles.radioText}>Pieces</Text>
//                 <RadioButton
//                   value="Pieces"
//                   status={unit === 'Pieces' ? 'checked' : 'unchecked'}
//                   onPress={() => setUnit('Pieces')}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Quantity</Text>
//             <TextInput
//               placeholder="Quantity"
//               placeholderTextColor={'#999797'}
//               keyboardType="default"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setQuantity}
//               value={quantity}
//             />
//           </View>

//           {/* <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Mobile No</Text>
//             <TextInput
//               placeholder="Your Mobile No"
//               placeholderTextColor={'#999797'}
//               keyboardType="numeric"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setMobile}
//               value={mobile}
//             />
//           </View> */}
//         </View>

//         <View style={styles.button}>
//           <TouchableOpacity
//             onPress={Addproduct}
//             style={styles.inBut}>
//             <View>
//               <Text style={styles.textSign}>Add Product</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default AddProduct;










// import React, { useState } from 'react';
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
// import styles from './Screens/UpdateProfile/stylesProfileEdit';
// import Back from 'react-native-vector-icons/Ionicons';
// import { RadioButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// function AddProduct() {
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [unit, setUnit] = useState('');
//   const [loading, setLoading] = useState(false); // Add a loading state
//   const route = useRoute();
//   const navigation = useNavigation();

//   const selectPhoto = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert('Permission to access camera roll is required!');
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
//       console.log('Image selection was canceled.');
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

//   const Addproduct = async () => {
//     setLoading(true); // Set loading to true when API call starts

//     try {
//       const token = await AsyncStorage.getItem('token');
      
//       if (!token) {
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: 'Token is missing. Please log in again.',
//         });
//         setLoading(false); // Set loading back to false
//         return;
//       }

//       if (!image || !name || !price || !quantity || !unit) {
//         Toast.show({
//           type: 'error',
//           text1: 'Validation Error',
//           text2: 'All fields are required.',
//         });
//         setLoading(false); // Set loading back to false
//         return;
//       }

//       // Upload image to Cloudinary
//       const imageUrl = await uploadImageToCloudinary(image);

//       const formdata = {
//         name,
//         image: imageUrl,
//         price,
//         quantity,
//         unit,
//         token,
//       };

//       console.log('Form Data:', formdata);

//       const res = await axios.post(`${API_URL}/add-product`, formdata);
//       console.log(res.data);

//       if (res.data.status === 'ok') {
//         navigation.navigate('Home');
//         Toast.show({
//           type: 'success',
//           text1: 'Product Added ✅',
//           text2: `${name }Your product has been added successfully!`,
//           position: 'top',
//           visibilityTime: 2000,
//         });
        
//       setName('');
//       setPrice('');
//       setQuantity('');
//       setUnit('');
//       setImage('');
        
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to Add Product ❌',
//           text2: 'Please check your input and try again.',
//           position: 'top',
//           visibilityTime: 2000,
//         });

//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//       // Toast.show({
//       //   type: 'error',
//       //   text1: 'Error',
//       //   text2: 'Could not add product',
//       // });
//     } finally {
//       navigation.navigate('Home');
//       setLoading(false);

//        // Set loading back to false when API call ends
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
//             <Text style={styles.nameText}>Add product</Text>
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
//                 uri: image || 'https://example.com/default-avatar.png',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={{ marginTop: 50, marginHorizontal: 22 }}>
//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Product Name</Text>
//             <TextInput
//               placeholder="Product Name"
//               placeholderTextColor={'#999797'}
//               style={styles.infoEditSecond_text}
//               onChangeText={setName}
//               value={name}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Price</Text>
//             <TextInput
//               placeholder="Price"
//               placeholderTextColor={'#999797'}
//               onChangeText={setPrice}
//               style={styles.infoEditSecond_text}
//               value={price}
//             />
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Units</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <View style={styles.radioView}>
//                 <Text style={styles.radioText}>Kg</Text>
//                 <RadioButton
//                   value="Kg"
//                   status={unit === 'Kg' ? 'checked' : 'unchecked'}
//                   onPress={() => setUnit('Kg')}
//                 />
//               </View>
//               <View style={styles.radioView}>
//                 <Text style={styles.radioText}>Pieces</Text>
//                 <RadioButton
//                   value="Pieces"
//                   status={unit === 'Pieces' ? 'checked' : 'unchecked'}
//                   onPress={() => setUnit('Pieces')}
//                 />
//               </View>
//             </View>
//           </View>

//           <View style={styles.infoEditView}>
//             <Text style={styles.infoEditFirst_text}>Quantity</Text>
//             <TextInput
//               placeholder="Quantity"
//               placeholderTextColor={'#999797'}
//               keyboardType="default"
//               maxLength={10}
//               style={styles.infoEditSecond_text}
//               onChangeText={setQuantity}
//               value={quantity}
//             />
//           </View>
//         </View>

//         <View style={styles.button}>
//           <TouchableOpacity
//             onPress={Addproduct}
//             style={[styles.inBut, { opacity: loading ? 0.7 : 1 }]} // Adjust button opacity when loading
//             disabled={loading} // Disable the button when loading
//           >
//             <View>
//               {loading ? (
//                 <ActivityIndicator color="#fff" /> // Show loader when loading
//               ) : (
//                 <Text style={styles.textSign}>Add Product</Text> // Show button text when not loading
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default AddProduct;






import React, { useState } from 'react';
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
import styles from './Screens/UpdateProfile/stylesProfileEdit';
import Back from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function AddProduct() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const selectPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
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
      console.log('Image selection was canceled.');
    }
  };

  const uploadImageToCloudinary = async (base64Image) => {
    const CLOUD_NAME = 'dvh2r5vcl'; 
    const UPLOAD_PRESET = 'mystore'; 

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64Image, upload_preset: UPLOAD_PRESET }),
      });

      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw error;
    }
  };

  const AddProduct = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Token is missing. Please log in again.',
        });
        setLoading(false);
        return;
      }

      if (!image || !name || !price || !quantity || !unit) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'All fields are required.',
        });
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImageToCloudinary(image);

      const formData = {
        name,
        image: imageUrl,
        price,
        quantity,
        unit,
        token,
      };

      console.log('Form Data:', formData);

      const response = await fetch(`${API_URL}/add-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      console.log(resData);

      if (resData.status === 'ok') {
        navigation.navigate('Home');
          Toast.show({
          type: 'success',
          text1: 'Product Added ✅',
          text2: `${name }Your product has been added successfully!`,
          position: 'top',
          visibilityTime: 2000,
        });
        setName('');
        setPrice('');
        setQuantity('');
        setUnit('');
        setImage('');
      } else {
          Toast.show({
          type: 'error',
          text1: 'Failed to Add Product ❌',
          text2: 'Please check your input and try again.',
          position: 'top',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not add product',
      });
    } finally {
      navigation.navigate('Home');
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
            <Text style={styles.nameText}>Add Product</Text>
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
            <Text style={styles.infoEditFirst_text}>Product Name</Text>
            <TextInput
              placeholder="Product Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Price</Text>
            <TextInput
              placeholder="Price"
              placeholderTextColor={'#999797'}
              onChangeText={setPrice}
              style={styles.infoEditSecond_text}
              value={price}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Units</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Kg</Text>
                <RadioButton
                  value="Kg"
                  status={unit === 'Kg' ? 'checked' : 'unchecked'}
                  onPress={() => setUnit('Kg')}
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Pieces</Text>
                <RadioButton
                  value="Pieces"
                  status={unit === 'Pieces' ? 'checked' : 'unchecked'}
                  onPress={() => setUnit('Pieces')}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Quantity</Text>
            <TextInput
              placeholder="Quantity"
              placeholderTextColor={'#999797'}
              keyboardType="default"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChangeText={setQuantity}
              value={quantity}
            />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={AddProduct}
            style={[styles.inBut, { opacity: loading ? 0.7 : 1 }]}
            disabled={loading}>
            <View>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textSign}>Add Product</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddProduct;

