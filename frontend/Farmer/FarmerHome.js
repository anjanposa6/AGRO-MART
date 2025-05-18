
// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { API_URL } from '@env';
// import Toast from 'react-native-toast-message';
// import { Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { FontAwesome } from '@expo/vector-icons';

// const FarmerHome = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [cart, setCart] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('All');
//   const [sortOrder, setSortOrder] = useState('none');
//   const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       loadCart();
//     }, [])
//   );

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/all-products`);
//       console.log(response)
//       if (response.data.status === "ok") {
//         setProducts(response.data.data);
//       } else {
//         setError("Failed to load products");
//       }
//     } catch (err) {
//       setError("Error fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       const cartData = await AsyncStorage.getItem('cart');
//       if (cartData) {
//         setCart(JSON.parse(cartData));
//       }
//     } catch (error) {
//       console.error("Error loading cart", error);
//     }
//   };

//   const saveCart = async (updatedCart) => {
//     try {
//       await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//       setCart(updatedCart);
//     } catch (error) {
//       console.error("Error saving cart", error);
//     }
//   };

//   const addToCart = (item) => {
//     const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
//     let updatedCart;
//     Toast.show({
//       type: 'success',
//       text1: 'Added to Cart 🛒',
//       text2: `${item.name} successfully added to your cart.`,
//       position: 'top',
//       visibilityTime: 500,
//     });
    
//     if (existingItemIndex !== -1) {
//       updatedCart = cart.map((cartItem, index) =>
//         index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//       );
      
//     } else {
//       updatedCart = [...cart, { ...item, quantity: 1 }];
//     }
//     setCart(updatedCart);
//     saveCart(updatedCart);
//   };

//   const handleCall = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   const handleWhatsApp = (phoneNumber, sellerName, productName) => {
//     const formattedPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
//     const message = `📢 Hello *${sellerName}*, I found *${productName}* on AgroMart and I'm interested in buying it.`;
//     const url = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`;
//     Linking.openURL(url);
//   };

//   const filteredProducts = products.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
//     (selectedCity === 'All' || item.city === selectedCity)
//   );

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOrder === 'lowToHigh') {
//       return a.price - b.price;
//     } else if (sortOrder === 'highToLow') {
//       return b.price - a.price;
//     }
//     return 0;
//   });

//   const clearFilters = () => {
//     setSelectedCity('All');
//     setSortOrder('none');
//     setSearchQuery('');
//   };

//   if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
//   if (error) return <Text style={styles.errorText}>{error}</Text>;

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search for products"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <View style={styles.filterButtonsContainer}>
//       <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setShowFilters(!showFilters)}
//         >
//            <FontAwesome name="filter" size={20} color="black" />
//           {/* <Text style={styles.filterButtonText}>Filter</Text> */}
//         </TouchableOpacity>
//       {showFilters && (
//         <TouchableOpacity
//           style={styles.clearFilterButton}
//           onPress={clearFilters}
//         >
//           <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
//         </TouchableOpacity>
//       )}

//       </View>
//       {showFilters && (
//         <View style={styles.filterContainer}>
//           <Picker
//             selectedValue={selectedCity}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSelectedCity(itemValue)}
//           >
//             <Picker.Item label="All Cities" value="All" />
//             {[...new Set(products.map(item => item.city))].map(city => (
//               <Picker.Item key={city} label={city} value={city} />
//             ))}
//           </Picker>

//           <Picker
//             selectedValue={sortOrder}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSortOrder(itemValue)}
//           >
//             <Picker.Item label="Sort by" value="none" />
//             <Picker.Item label="Price: Low to High" value="lowToHigh" />
//             <Picker.Item label="Price: High to Low" value="highToLow" />
//           </Picker>
//         </View>
//       )}

//       <FlatList
//         data={sortedProducts}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => {
//           const isInCart = cart.some(cartItem => cartItem._id === item._id);

//           return (
//             <View style={styles.card}>
//               <TouchableOpacity 
//                 onPress={() => addToCart(item)} 
//                 style={[styles.cartButton, { backgroundColor: isInCart ? '#dc3545' : '#007bff' }]}
//               >
//                 <Text style={styles.cartButtonText}>{isInCart ? "Added" : "Add to Cart"}</Text>
//               </TouchableOpacity>
//               <Image source={{ uri: item.image }} style={styles.productImage} />
//               <View style={styles.details}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.productDetails}>Quantity: {item.quantity}</Text>
//                 <Text style={styles.productDetails}>City: {item.city}</Text>
//                 <Text style={styles.productPrice}>₹{item.price} / {item.unit}</Text>
//                 <View style={styles.sellerContainer}>
//                   <TouchableOpacity onPress={() => handleCall(item.userMobile)} style={styles.iconButton}>
//                     <FontAwesome name="phone" size={20} color="white" />
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => handleWhatsApp(item.userMobile, item.userName, item.name)} style={styles.iconButton}>
//                     <FontAwesome name="whatsapp" size={20} color="white" />
//                   </TouchableOpacity>
//                   <Image source={{ uri: item.userImage }} style={styles.sellerImage} />
//                   <Text style={styles.sellerName}>{item.userName}</Text>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     textAlign: 'center',
//     color: 'red',
//     fontSize: 16,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//   },
//   filterButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   clearFilterButton: {
//     backgroundColor: '#dc3545',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   clearFilterButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   filterButton: {
//     // backgroundColor: '#007bff',
//     backgroundColor: 'white',
//     // color:'black',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   filterButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   filterContainer: {
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   picker: {
//     height: 60,
//     marginBottom: -10,
//     backgroundColor: '#fff',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//     position: 'relative',
//   },
//   productImage: {
//     width: 100,
//     height: 80,
//     borderRadius: 10,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 20,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productDetails: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#28a745',
//   },
//   sellerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   sellerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginLeft: 80,
//   },
//   sellerName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   iconButton: {
//     backgroundColor: '#28a745',
//     padding: 8,
//     borderRadius: 50,
//     marginRight: 8,
//   },
//   cartButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10, 
//     width: 100, 
//     height: 35, 
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   cartButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 12,
//     textAlign: 'center',
//   },
// });


// export default FarmerHome;


import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const FarmerHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');
  const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

  useEffect(() => {
    fetchProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/all-products`);
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        setProducts(data.data);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error("Error loading cart", error);
    }
  };

  const saveCart = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error("Error saving cart", error);
    }
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = (phoneNumber, sellerName, productName) => {
    const formattedPhoneNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
    const message = `📢 Hello *${sellerName}*, I found *${productName}* on AgroMart and I'm interested in buying it.`;
    const url = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const filteredProducts = products.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (selectedCity === 'All' || item.city === selectedCity)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  const clearFilters = () => {
    setSelectedCity('All');
    setSortOrder('none');
    setSearchQuery('');
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <FontAwesome name="filter" size={20} color="black" />
        </TouchableOpacity>
        {showFilters && (
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>
      {showFilters && (
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={selectedCity}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
            <Picker.Item label="All Cities" value="All" />
            {[...new Set(products.map(item => item.city))].map(city => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>

          <Picker
            selectedValue={sortOrder}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
          >
            <Picker.Item label="Sort by" value="none" />
            <Picker.Item label="Price: Low to High" value="lowToHigh" />
            <Picker.Item label="Price: High to Low" value="highToLow" />
          </Picker>
        </View>
      )}

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isInCart = cart.some(cartItem => cartItem._id === item._id);

          return (
            <View style={styles.card}>
              <TouchableOpacity 
                onPress={() => addToCart(item)} 
                style={[styles.cartButton, { backgroundColor: isInCart ? '#dc3545' : '#007bff' }]}
              >
                <Text style={styles.cartButtonText}>{isInCart ? "Added" : "Add to Cart"}</Text>
              </TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.details}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDetails}>Quantity: {item.quantity}</Text>
                <Text style={styles.productDetails}>City: {item.city}</Text>
                <Text style={styles.productPrice}>₹{item.price} / {item.unit}</Text>
                <View style={styles.sellerContainer}>
                  <TouchableOpacity onPress={() => handleCall(item.userMobile)} style={styles.iconButton}>
                    <FontAwesome name="phone" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleWhatsApp(item.userMobile, item.userName, item.name)} style={styles.iconButton}>
                    <FontAwesome name="whatsapp" size={20} color="white" />
                  </TouchableOpacity>
                  <Image source={{ uri: item.userImage }} style={styles.sellerImage} />
                  <Text style={styles.sellerName}>{item.userName}</Text>
                </View>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearFilterButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearFilterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 20,
    borderRadius: 10,
  },
  picker: {
    height: 60,
    marginBottom: -10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 80,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  iconButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  cartButton: {
    position: 'absolute',
    top: 10,
    right: 10, 
    width: 100, 
    height: 35, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 1,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default FarmerHome;



