// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const loadCart = async () => {
//       try {
//         const storedCart = await AsyncStorage.getItem('cart');
//         if (storedCart) {
//           setCartItems(JSON.parse(storedCart));
//         }
//       } catch (error) {
//         console.error('Error loading cart:', error);
//       }
//     };

//     loadCart();
//     const interval = setInterval(loadCart, 1000); // Refresh cart every second
//     return () => clearInterval(interval);
//   }, []);

//   const updateCart = async (updatedCart) => {
//     setCartItems(updatedCart);
//     await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const incrementQuantity = async (id) => {
//     const updatedCart = cartItems.map(item =>
//       item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//     );
//     updateCart(updatedCart);
//   };

//   const decrementQuantity = async (id) => {
//     const updatedCart = cartItems
//       .map(item => item._id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item)
//       .filter(item => item.quantity > 0);
//     updateCart(updatedCart);
//   };

//   const removeFromCart = async (id) => {
//     const updatedCart = cartItems.filter(item => item._id !== id);
//     updateCart(updatedCart);
//   };

//   const clearCart = async () => {
//     updateCart([]);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Cart</Text>
//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyText}>Your cart is empty.</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <View style={styles.cartItem}>
//                 <Image source={{ uri: item.image }} style={styles.productImage} />
//                 <View style={styles.details}>
//                   <Text style={styles.productName}>{item.name}</Text>
//                   <Text style={styles.productPrice}>₹{item.price} / {item.unit}</Text>

//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity onPress={() => decrementQuantity(item._id)} style={styles.quantityButton}>
//                       <Text style={styles.quantityText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantity}>{item.quantity || 1}</Text>
//                     <TouchableOpacity onPress={() => incrementQuantity(item._id)} style={styles.quantityButton}>
//                       <Text style={styles.quantityText}>+</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.removeButton}>
//                     <Text style={styles.removeText}>Remove</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           />

//           <Text style={styles.totalAmount}>Total: ₹{calculateTotal()}</Text>

//           <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
//             <Text style={styles.clearCartText}>Clear Cart</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.payButton}>
//             <Text style={styles.payButtonText}>Pay Now</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#888',
//   },
//   cartItem: {
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
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#009688',
//     fontWeight: 'bold',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   quantityButton: {
//     backgroundColor: '#009688',
//     padding: 6,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   quantityText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   quantity: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   removeButton: {
//     marginTop: 8,
//     backgroundColor: 'red',
//     padding: 6,
//     borderRadius: 5,
//     alignSelf: 'flex-start',
//   },
//   removeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   totalAmount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'right',
//     marginVertical: 10,
//   },
//   clearCartButton: {
//     marginTop: 20,
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   clearCartText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   payButton: {
//     marginTop: 15,
//     backgroundColor: '#28a745',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   payButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Cart;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";
// import axios from "axios";
// import {useNavigation} from '@react-navigation/native';
// import { API_URL } from "@env";
// const Cart = ({navigation}) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadCart = async () => {
//       try {
//         const storedCart = await AsyncStorage.getItem("cart");
//         if (storedCart) {
//           setCartItems(JSON.parse(storedCart));
//         }
//       } catch (error) {
//         console.error("Error loading cart:", error);
//       }
//     };

//     loadCart();
//     const interval = setInterval(loadCart, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePayment = async () => {
//     setLoading(true)
//     if (cartItems.length === 0) {
//       Toast.show({
//         type: "error",
//         text1: "Cart is Empty",
//         text2: "Add items before proceeding to payment.",
//       });
//       return;
//     }

//     try {
//       const email = await AsyncStorage.getItem("userEmail"); // Assume user email is stored
//       if (!email) {
//         Toast.show({
//           type: "error",
//           text1: "Email Not Found",
//           text2: "Login again to proceed with payment.",
//         });
//         return;
//       }

//       const total = calculateTotal();
//       const response = await axios.post(`${API_URL}/send-invoice`, {
//         email,
//         items: cartItems,
//         total,
//       });

//       if (response.data.message === "Invoice sent successfully") {
//         Toast.show({
//           type: "success",
//           text1: "Order Placed!",
//           text2: "Invoice sent to your email.",
//         });
//             navigation.goBack();
//         clearCart(); // Clear cart after order
//       } else {
//         throw new Error("Failed to send invoice");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       Toast.show({
//         type: "error",
//         text1: "Payment Failed",
//         text2: "Something went wrong. Try again.",
//       }
    
//     );
//     // finally{
     
//     // }
      
//     }
//     finally{
//       setLoading(false);
//     }
//   };

//   const updateCart = async (updatedCart) => {
//     setCartItems(updatedCart);
//     await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const incrementQuantity = async (id) => {
//     const updatedCart = cartItems.map((item) =>
//       item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//     );
//     updateCart(updatedCart);
//   };

//   const decrementQuantity = async (id) => {
//     const updatedCart = cartItems
//       .map((item) =>
//         item._id === id
//           ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
//           : item
//       )
//       .filter((item) => item.quantity > 0);
//     updateCart(updatedCart);
//   };

//   const removeFromCart = async (id) => {
//     const updatedCart = cartItems.filter((item) => item._id !== id);
//     updateCart(updatedCart);
//     Toast.show({
//       type: "error",
//       text1: "Removed from Cart ❌",
//       text2: "Item has been removed from your cart.",
//       position: "top",
//       visibilityTime: 1000,
//     });
//   };

//   const clearCart = async () => {
//     updateCart([]);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * (item.quantity || 1),
//       0
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Cart</Text>
//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyText}>Your cart is empty.</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <View style={styles.cartItem}>
//                 <Image
//                   source={{ uri: item.image }}
//                   style={styles.productImage}
//                 />
//                 <View style={styles.details}>
//                   <Text style={styles.productName}>{item.name}</Text>
//                   <Text style={styles.productPrice}>
//                     ₹{item.price} / {item.unit}
//                   </Text>
//                 </View>

//                 {/* Quantity and Remove Section */}
//                 <View style={styles.actionContainer}>
//                   <View style={styles.quantityContainer}>
//                     <TouchableOpacity
//                       onPress={() => decrementQuantity(item._id)}
//                       style={styles.quantityButton}
//                     >
//                       <Text style={styles.quantityText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.quantity}>{item.quantity || 1}</Text>
//                     <TouchableOpacity
//                       onPress={() => incrementQuantity(item._id)}
//                       style={styles.quantityButton}
//                     >
//                       <Text style={styles.quantityText}>+</Text>
//                     </TouchableOpacity>
//                   </View>

//                   <TouchableOpacity
//                     onPress={() => removeFromCart(item._id)}
//                     style={styles.removeButton}
//                   >
//                     <Text style={styles.removeText}>Remove</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//             showsVerticalScrollIndicator={false}
//           />

//           <Text style={styles.totalAmount}>Total: ₹{calculateTotal()}</Text>

//           <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
//             <Text style={styles.clearCartText}>Clear Cart</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
//             {loading ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Text style={styles.payButtonText}>Pay Now</Text>
//             )}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   emptyText: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#888",
//   },
//   cartItem: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   productPrice: {
//     fontSize: 13,
//     color: "#009688",
//     fontWeight: "bold",
//   },
//   actionContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#e0f2f1",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   quantityButton: {
//     backgroundColor: "#009688",
//     padding: 3,
//     borderRadius: 5,
//     marginHorizontal: 6,
//   },
//   quantityText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   quantity: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   removeButton: {
//     backgroundColor: "red",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   removeText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   totalAmount: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "right",
//     marginVertical: 10,
//   },
//   clearCartButton: {
//     marginTop: 20,
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   clearCartText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   payButton: {
//     marginTop: 15,
//     backgroundColor: "#28a745",
//     padding: 12,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   payButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Cart;




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {useNavigation} from '@react-navigation/native';
import { API_URL } from "@env";

const Cart = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCart();
    const interval = setInterval(loadCart, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePayment = async () => {
    setLoading(true)
    if (cartItems.length === 0) {
      Toast.show({
        type: "error",
        text1: "Cart is Empty",
        text2: "Add items before proceeding to payment.",
      });
      return;
    }

    try {
      const email = await AsyncStorage.getItem("userEmail"); // Assume user email is stored
      console.log(email);
      if (!email) {
        Toast.show({
          type: "error",
          text1: "Email Not Found",
          text2: "Login again to proceed with payment.",
        });
        return;
      }

      const total = calculateTotal();
      const response = await fetch(`${API_URL}/send-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          items: cartItems,
          total,
        }),
      });

      const data = await response.json();

      if (data.message === "Invoice sent successfully") {
        Toast.show({
          type: "success",
          text1: "Order Placed!",
          text2: "Invoice sent to your email.",
        });
        navigation.goBack();
        clearCart(); // Clear cart after order
      } else {
        throw new Error("Failed to send invoice");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (updatedCart) => {
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decrementQuantity = async (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeFromCart = async (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
    Toast.show({
      type: "error",
      text1: "Removed from Cart ❌",
      text2: "Item has been removed from your cart.",
      position: "top",
      visibilityTime: 1000,
    });
  };

  const clearCart = async () => {
    updateCart([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.details}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    ₹{item.price} / {item.unit}
                  </Text>
                </View>

                <View style={styles.actionContainer}>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => decrementQuantity(item._id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity || 1}</Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(item._id)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeFromCart(item._id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />

          <Text style={styles.totalAmount}>Total: ₹{calculateTotal()}</Text>

          <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
            <Text style={styles.clearCartText}>Clear Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.payButtonText}>Pay Now</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 13,
    color: "#009688",
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f2f1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: "#009688",
    padding: 3,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  clearCartButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  clearCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    marginTop: 15,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
