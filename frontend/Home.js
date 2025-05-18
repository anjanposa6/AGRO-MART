// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { API_URL } from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [deletingProductId, setDeletingProductId] = useState(null); // Track the product being deleted
//   const navigation = useNavigation();

//   // Fetch products from the server
//   const fetchProducts = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.post(`${API_URL}/products`, { token });
//       if (response.data.status === 'ok') {
//         setProducts(response.data.data);
//         setFilteredProducts(response.data.data);
//       } else {
//         setError('Failed to load products');
//       }
//     } catch (err) {
//       setError('Error fetching products');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const results = products.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredProducts(results);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   // Navigate to update product screen
//   const handleUpdateProduct = (product) => {
//     navigation.navigate('UpdateProduct', { product });
//   };

//   // Handle delete product
//   const handleDeleteProduct = async (productId) => {
//     try {
//       setDeletingProductId(productId); // Start loading for the specific product being deleted

//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         setError('Token not found');
//         return;
//       }

//       const response = await axios.delete(`${API_URL}/products-delete/${productId}`, {
//         data: { token }
//       });

//       if (response.data.status === 'ok') {
//         // Remove the deleted product from the local state
//         Toast.show({
//           type: 'success',
//           text1: 'Product Deleted ✅',
//           text2: 'The product has been removed successfully.',
//           position: 'top',
//           visibilityTime: 2000,
//         });
        
//         setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
//         setProducts(products.filter(product => product._id !== productId));
//       } else {
//         setError('Failed to delete product');
//         Toast.show({
//           type: 'error',
//           text1: 'Deletion Failed ❌',
//           text2: 'Something went wrong. Try again.',
//           position: 'bottom',
//           visibilityTime: 3000,
//         });
        
//       }
//     } catch (err) {
//       setError('Error deleting product');
//       console.error(err);
//     } finally {
//       setDeletingProductId(null); // Stop loading once the deletion is done
//     }
//   };

//   useEffect(() => {
//     fetchProducts();

//     const interval = setInterval(() => {
//       fetchProducts();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return <Text style={styles.errorText}>{error}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search Products"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {filteredProducts.length === 0 ? (
//         <Text style={styles.noItemsText}>No items found</Text>
//       ) : (
//         <FlatList
        
//           data={filteredProducts}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.productContainer}>
//               <Image source={{ uri: item.image }} style={styles.productImage} />
//               <View style={styles.productDetails}>
//                 <Text style={styles.productName}>{item.name}</Text>
//                 <Text style={styles.productPrice}>{item.price} $ / {item.unit}</Text>
//                 <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.updateButton}
//                 onPress={() => handleUpdateProduct(item)}
//               >
//                 <Text style={styles.updateButtonText}>Update</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() => handleDeleteProduct(item._id)}
//                 disabled={deletingProductId === item._id} // Disable button when deleting
//               >
//                 {deletingProductId === item._id ? (
//                   <ActivityIndicator size="small" color="#fff" /> // Show loader while deleting
//                 ) : (
//                   <Text style={styles.deleteButtonText}>Delete</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
    
//   },
//   searchInput: {
//     height: 40,
//     marginTop: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
//   productContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     opacity: 0.5,
//     color: '#555',
//   },
//   productQuantity: {
//     fontSize: 12,
//     color: '#777',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   noItemsText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#777',
//   },
//   updateButton: {
//     backgroundColor: '#09B256',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     top: 20,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 8,
//     right: 15,
//     backgroundColor: 'red',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 20,
//   },
//   deleteButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Home;




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deletingProductId, setDeletingProductId] = useState(null); // Track the product being deleted
  const navigation = useNavigation();

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        setProducts(data.data);
        setFilteredProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  };

  // Navigate to update product screen
  const handleUpdateProduct = (product) => {
    navigation.navigate('UpdateProduct', { product });
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      setDeletingProductId(productId); // Start loading for the specific product being deleted

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token not found');
        return;
      }

      const response = await fetch(`${API_URL}/products-delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        // Remove the deleted product from the local state
                Toast.show({
          type: 'success',
          text1: 'Product Deleted ✅',
          text2: 'The product has been removed successfully.',
          position: 'top',
          visibilityTime: 2000,
        });
        setFilteredProducts(filteredProducts.filter(product => product._id !== productId));
        setProducts(products.filter(product => product._id !== productId));
      } else {
        setError('Failed to delete product');
          Toast.show({
          type: 'error',
          text1: 'Deletion Failed ❌',
          text2: 'Something went wrong. Try again.',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      setError('Error deleting product');
      console.error(err);
    } finally {
      setDeletingProductId(null); // Stop loading once the deletion is done
    }
  };

  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      fetchProducts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {filteredProducts.length === 0 ? (
        <Text style={styles.noItemsText}>No items found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} $ / {item.unit}</Text>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdateProduct(item)}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProduct(item._id)}
                disabled={deletingProductId === item._id} // Disable button when deleting
              >
                {deletingProductId === item._id ? (
                  <ActivityIndicator size="small" color="#fff" /> // Show loader while deleting
                ) : (
                  <Text style={styles.deleteButtonText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.5,
    color: '#555',
  },
  productQuantity: {
    fontSize: 12,
    color: '#777',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  updateButton: {
    backgroundColor: '#09B256',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    top: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 15,
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;




