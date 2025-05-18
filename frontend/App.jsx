
import React, { useState, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import UpdateProduct from './UpdateProduct';
import Login from './Screens/Login&Register/Login';
import Register from './Screens/Login&Register/Register';
import BottomNav from './BottomNav'; // This should include the Home and Settings components
import Profile from '../frontend/Screens/UpdateProfile/Profile';
import Balance from './Balance';
const Stack = createStackNavigator();
import ProfileScreen from './Screens/ProfileScreen';
import FarmerNav from './FarmerNav';
// import Toast from 'react-native-toast-message';
import Toast, { BaseToast } from 'react-native-toast-message';
export default function App() {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'white' ,borderLeftColor:"green"}} // Change success toast background
        leadingIconContainerStyle={{ backgroundColor: 'green' }}
        text1Style={{ color: 'black' }} // Title text color
        text2Style={{ color: 'black' }} // Message text color
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: 'white',borderLeftColor:"red" }} // Change error toast background
        // leadingIconContainerStyle={{ backgroundColor: 'red' }}
        text1Style={{ color: 'black' }} // Title text color
        text2Style={{ color: 'black' }} // Message text color
      />
    ),
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('isLoggedIn');
        console.log('Auth token:', token);
        setIsLoggedIn(!!token); // If token exists, user is logged in
      } catch (error) {
        console.error('Failed to fetch auth token:', error);
      } finally {
        setLoading(false); // End loading after check
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    // Render loading state here if needed
    return null; // Or you can show a Loading component/spinner here
  }

  return (
 
   <>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // If logged in, show the BottomNav and other app screens
        <>
          <Stack.Screen name="Farmer" component={FarmerNav} />
          <Stack.Screen name="HomeScreen" component={BottomNav} />
          <Stack.Screen name="Balance" component={Balance} />
          
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
        </>
      ) : (
        // If not logged in, show the Login and Register screens only
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Farmer" component={FarmerNav} />
          <Stack.Screen name="HomeScreen" component={BottomNav} />
          <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  <Toast config={toastConfig}/>
   </>
  
   
  );
}
