import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Prices from './Farmer/Prices';
import Home from './Home';
// import Settings from './Settings';
// import Profile from './Profile';
import { Image ,Text} from 'react-native';
import Balance from './Balance';
// import Prices from './Farmer/Prices'
const Tab = createBottomTabNavigator();
// import UpdateProfile from './Screens/UpdateProfile/UpdateProfile';
import Profile from '../frontend/Screens/UpdateProfile/Profile';
import ProfileScreen from './Screens/ProfileScreen';
import AddProduct from './AddProduct';
import FarmerHome from './Farmer/FarmerHome'
import FarmerGPT from './FarmerGPT';
import Cart from './Farmer/Cart'
function FarmerNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Prices') {
            // iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          }  else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Farmer GPT') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 60, // Increase height here
          paddingBottom: 10, // Adjust padding if necessary
          paddingTop: 10,
          borderRadius:20,
          marginLeft:10,
          marginRight:10,
          marginBottom:10, // Optional: increase top padding for more space
    
        },
      })}
    > 

<Tab.Screen 
        name="Home" 
        component={FarmerHome} 
        options={{ 
          headerShown: true, // Show header only on Home
          headerTitle: () => (
            <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', flex: 1 }}>
              AgroMarket
            </Text>
          ), 
          headerStyle: { backgroundColor: '#09B256' }, // Set custom header background color
          headerTintColor: '#09B256', // Set custom title color
        }} 
      />

<Tab.Screen 
        name="Prices" 
        component={Prices} 
        options={{ 
          headerShown: true, // Show header only on Home
          headerTitle: () => (
            <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', flex: 1 }}>
              Market Prices
            </Text>
          ), 
          headerStyle: { backgroundColor: '#09B256' }, // Set custom header background color
          headerTintColor: '#09B256', // Set custom title color
        }} 
      />

      {/* <Tab.Screen  options={{ headerShown: true }} name="Home" component={Home} /> */}
     
      {/* <Tab.Screen name="Transactions" component={Settings} /> */}
        <Tab.Screen
      options={{ 
        headerShown: true, // Show header only on Home
        headerTitle: () => (
          <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', flex: 1,fontWeight:'bold' }}>
            {/* Cart */}
          </Text>
        ), 
        headerStyle: { backgroundColor: '#09B256',height:80, }, // Set custom header background color
        headerTintColor: '#09B256', // Set custom title color
      }} 
      
       name="Cart" component={Cart} />
      <Tab.Screen
       name="Farmer GPT" 
       component={FarmerGPT} 
       options={{ 
         headerShown: true, // Show header only on Home
         headerTitle: () => (
           <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', flex: 1,fontWeight:'bold' }}>
             Farmer GPT
           </Text>
         ), 
         headerStyle: { backgroundColor: '#09B256',height:80, }, // Set custom header background color
         headerTintColor: '#09B256', // Set custom title color
       }} 
       />
      
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default FarmerNav;