// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const UpdateProduct = ({ route, navigation }) => {
//   const { product } = route.params; // Access product data from route params

//   const [name, setName] = useState(product.name);
//   const [price, setPrice] = useState(product.price);
//   const [quantity, setQuantity] = useState(product.quantity);

//   const handleSave = () => {
//     // Logic to save updated product
//     console.log('Updated Product:', { name, price, quantity });
//     // Navigate back after updating
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Product Name</Text>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//       />

//       <Text style={styles.label}>Price</Text>
//       <TextInput
//         style={styles.input}
//         value={price.toString()}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Quantity</Text>
//       <TextInput
//         style={styles.input}
//         value={quantity.toString()}
//         onChangeText={setQuantity}
//         keyboardType="numeric"
//       />

//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 8,
//     marginBottom: 16,
//     borderRadius: 4,
//   },
// });

// export default UpdateProduct;



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
// import styles from './Screens/UpdateProfile/stylesProfileEdit';
// import Back from 'react-native-vector-icons/Ionicons';
// import { RadioButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// import { useRoute } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// function UpdateProduct({ route, navigation }) {
//   // const navigation = useNavigation();
//     const { product } = route.params;
//   const [image, setImage] = useState(product.image);
//   const [name, setName] = useState(product.name);
//     const [loading, setLoading] = useState(false);
//   const [price, setPrice] = useState(product.price);
//   const [quantity, setQuantity] = useState(product.quantity);
//   const [productId, setProductID] = useState(product._id);
//   console.log(productId)
//   const [unit, setUnit] = useState(product.unit);
//   // const [token, setToken] = useState('');
// //   const route = useRoute();
//   const token = AsyncStorage.getItem('token');
//   console.log(token)

//   const handleBackNavigation = () => {
//     navigation.goBack(); // Navigate back to the previous screen
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

//   const Addproduct = async () => {
//     setLoading(true);
//     // navigation.goBack();
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
  
//       // Upload image to Cloudinary
//       const imageUrl = await uploadImageToCloudinary(image);
  
//       const formdata = {
//         name,
//         image: imageUrl, // Use the Cloudinary URL
//         price,
//         quantity,
//         unit,
//         token,
//         productId, // Include the token
//       };

//       console.log("Form Data:", formdata);

//     //   const res = await axios.post('http://192.168.9.186:5000/add-product', formdata);
//     const res = await axios.put(`${API_URL}/products/${productId}`, formdata);
    
//       console.log(res.data);
//       console.log(formdata)
//       if (res.data.status === "ok") {
//         Toast.show({
//           type: 'success',
//           text1: 'Product Updated ✅',
//           text2: 'Your product details have been updated.',
//           position: 'top',
//           visibilityTime: 2000,
//         });
//             navigation.goBack();
        
//       }
      
//        else {
//         Toast.show({
//           type: 'error',
//           text1: 'Update Failed ❌',
//           text2: 'Could not update product. Try again!',
//           position: 'top',
//           visibilityTime: 2000,
//         });
        
//       }
//     } catch (error) {
//       console.error("Error updating Product:", error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Could not update profile',
//       });
//     }
//     finally {
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
//             <Back onPress={handleBackNavigation} name="arrow-back" size={30} style={styles.backIcon} />
//           </View>
//           <View style={{ flex: 3 }}>
//             <Text style={styles.nameText}>Update product</Text>
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
//               value={price.toString()}
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
//               value={quantity.toString()}
//             />
//           </View>
//         </View>

//         <View style={styles.button}>
//           <TouchableOpacity
//             onPress={Addproduct}
//             style={styles.inBut}>
//             <View>
//             {loading ? (
//                         <ActivityIndicator size="small" color="#fff" />
//                       ) : (
//                         <Text style={styles.textSign}>Update Product</Text>
//                       )}
             
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default UpdateProduct;







import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { API_URL } from '@env';
import { Avatar } from 'react-native-paper';
import styles from './Screens/UpdateProfile/stylesProfileEdit';
import Back from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UpdateProduct({ route, navigation }) {
  const { product } = route.params;
  const [image, setImage] = useState(product.image);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [productId, setProductID] = useState(product._id);
  const [unit, setUnit] = useState(product.unit);

  const handleBackNavigation = () => {
    navigation.goBack();
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
    }
  };

  const uploadImageToCloudinary = async (base64Image) => {
    const CLOUD_NAME = 'dvh2r5vcl';
    const UPLOAD_PRESET = 'mystore';
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: 'POST',
      body: JSON.stringify({
        file: base64Image,
        upload_preset: UPLOAD_PRESET,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data.secure_url;
  };

  const updateProduct = async () => {
    setLoading(true);
    // navigation.goBack();
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Token is missing. Please log in again.' });
        return;
      }
      if (!image || !name || !price || !quantity || !unit) {
        Toast.show({ type: 'error', text1: 'Validation Error', text2: 'All fields are required.' });
        return;
      }
      const imageUrl = await uploadImageToCloudinary(image);
      const formdata = {
        name,
        image: imageUrl,
        price,
        quantity,
        unit,
        token,
        productId,
      };
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.status === "ok") {
        // Toast.show({ type: 'success', text1: 'Product Updated Successfully' });
        Toast.show({
          type: 'success',
          text1: 'Product Updated ✅',
          text2: 'Your product details have been updated.',
          position: 'top',
          visibilityTime: 2000,
        });
            navigation.goBack();
      } else {
        // Toast.show({ type: 'error', text1: 'Update Failed', text2: data.message || 'An error occurred' });
        Toast.show({
          type: 'error',
          text1: 'Update Failed ❌',
          text2: 'Could not update product. Try again!',
          position: 'top',
          visibilityTime: 2000,
        });
        

      }
    } catch (error) {
      console.error("Error updating Product:", error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not update product' });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Back onPress={handleBackNavigation} name="arrow-back" size={30} style={styles.backIcon} />
          </View>
          <View style={{ flex: 2 }}>
            {/* <Text style={styles.nameText}>Update Product</Text> */}
          </View>
        </View>
        <View style={styles.camDiv}>
          <TouchableOpacity onPress={selectPhoto}>
            <Avatar.Image size={140} style={styles.avatar} source={{ uri: image || 'https://example.com/default-avatar.png' }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50, marginHorizontal: 22 }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Product Name</Text>
            <TextInput placeholder="Product Name" style={styles.infoEditSecond_text} onChangeText={setName} value={name} />
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Price</Text>
            <TextInput placeholder="Price" style={styles.infoEditSecond_text} onChangeText={setPrice} value={price.toString()} />
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
            <TextInput placeholder="Quantity" style={styles.infoEditSecond_text} onChangeText={setQuantity} value={quantity.toString()} />
          </View>
        </View>
        <View style={styles.button}>
        <TouchableOpacity
            onPress={updateProduct}
            style={styles.inBut}>
            <View>
            {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.textSign}>Update Product</Text>
                      )}
             
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default UpdateProduct;

