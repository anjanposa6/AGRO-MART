
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { Ionicons } from '@expo/vector-icons';

// const API_KEY = "AIzaSyATmTbYf_dzDTuu1QRAClT-b3JpIj9GOls"; // Replace with your Google API Key

// const FarmerGPT = () => {
//   const [conversation, setConversation] = useState([]); // Stores chat history
//   const [loadingMessageIndex, setLoadingMessageIndex] = useState(null); // Loading state for specific message
//   const [inputText, setInputText] = useState(''); // Stores user input message

//   const genAI = new GoogleGenerativeAI(API_KEY); // Initialize GoogleGenerativeAI with API Key
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-latest",
//     systemInstruction: "you are ai model named FarmerGPT specified for farmers alone dont give any other responses beyond that.",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   const safetySettings = [
//     { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//   ];

//   const handleChatSubmission = async () => {
//     if (inputText.trim() === '') return; // Prevent sending empty messages

//     // Immediately add the user's message to the conversation
//     const newMessage = { user: inputText, bot: '...', timestamp: new Date() };
//     setConversation(prev => [...prev, newMessage]); // Add to conversation history
//     const currentIndex = conversation.length; // Get the current index for loading state
//     setLoadingMessageIndex(currentIndex); // Set the loading message index to the current conversation length

//     setInputText(''); // Clear input field after sending

//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         safetySettings,
//         history: conversation.map((item) => [
//           { role: 'user', parts: [{ text: item.user }] },
//           { role: 'model', parts: [{ text: item.bot }] },
//         ]).flat(),
//       });

//       const result = await chatSession.sendMessage(inputText);
//       const response = await result.response;

//       if (response.status === 'blocked') {
//         console.error('Response blocked due to potentially harmful content!');
//         return;
//       }

//       const text = await response.text();
//       // Update the conversation with the bot's actual response
//       const updatedConversation = [...conversation];
//       updatedConversation[currentIndex] = { user: inputText, bot: text, timestamp: new Date() };
//       setConversation(updatedConversation); // Update conversation history
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       setLoadingMessageIndex(null); // Reset loading index after response
//     }
//   };

//   useEffect(() => {
//     // Optionally initialize conversation here
//   }, []);

//   const renderMessage = ({ item, index }) => (
//     <View style={styles.messageContainer}>
//       <View style={styles.userMessageContainer}>
//         <Text style={styles.userMessage}>{item.user}</Text>
//       </View>
//       <View style={styles.botMessageContainer}>
//         <Text style={styles.botMessage}>
//           {/* {loadingMessageIndex === index ? 'Loading...' : item.bot} */}
//           {item.bot}
//         </Text>
//         {loadingMessageIndex === index && <ActivityIndicator size="small" color="#fff" style={styles.loadingIndicator} />}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {conversation.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Image
//             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1995/1995541.png' }} // Example farmer logo URL
//             style={styles.logo}
//           />
//           <Text style={styles.description}>Welcome to FarmerGPT! Your AI assistant for farming tips and advice. Start chatting to ask your questions about farming.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={conversation}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderMessage}
//           ListFooterComponent={loadingMessageIndex !== null ? <ActivityIndicator size="large" color="#0000ff" /> : null}
//         />
//       )}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Type your message"
//           placeholderTextColor="#777"
//         />
//         <TouchableOpacity onPress={handleChatSubmission} disabled={loadingMessageIndex !== null}>
//           <Ionicons name="send" size={24} color={loadingMessageIndex !== null ? "#ccc" : "#000"} />
//         </TouchableOpacity>
//       </View>

      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//     marginTop:40,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     flex: 1,
//     marginRight: 10,

//   },
//   messageContainer: {
//     marginBottom: 15,
//   },
//   userMessageContainer: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#fff',
//     padding: 10,
//     marginRight:10,
//     borderRadius: 8,
//     maxWidth: '80%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom:10,
//   },
//   userMessage: {
//     color: '#333',
//   },
//   botMessageContainer: {
//     alignSelf: 'flex-start',
//     // backgroundColor:'#09B256',
//     padding: 10,
    
//     borderRadius: 8,
//     maxWidth: '80%',
//     borderWidth: 1,
//     borderColor: '#7bb149',
//   },
//   botMessage: {
//     color: '#fff',
//   },
//   loadingIndicator: {
//     marginTop: 5,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//   },
// });

// export default FarmerGPT;



// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Markdown from 'react-native-markdown-display';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { Ionicons } from '@expo/vector-icons';

// const API_KEY = "AIzaSyATmTbYf_dzDTuu1QRAClT-b3JpIj9GOls"; // Replace with your Google API Key

// const FarmerGPT = () => {
//   const [conversation, setConversation] = useState([]); // Stores chat history
//   const [loadingMessageIndex, setLoadingMessageIndex] = useState(null); // Loading state for specific message
//   const [inputText, setInputText] = useState(''); // Stores user input message
//   const flatListRef = useRef(null); // Reference to the FlatList

//   const genAI = new GoogleGenerativeAI(API_KEY); // Initialize GoogleGenerativeAI with API Key
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-latest",
//     systemInstruction: "you are ai model named FarmerGPT specified for farmers alone dont give any other responses beyond that.",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   const safetySettings = [
//     { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
//     { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//   ];

//   const handleChatSubmission = async () => {
//     if (inputText.trim() === '') return; // Prevent sending empty messages

//     // Immediately add the user's message to the conversation
//     const newMessage = { user: inputText, bot: '...', timestamp: new Date() };
//     setConversation(prev => [...prev, newMessage]); // Add to conversation history
//     const currentIndex = conversation.length; // Get the current index for loading state
//     setLoadingMessageIndex(currentIndex); // Set the loading message index to the current conversation length

//     setInputText(''); // Clear input field after sending

//     try {
//       const chatSession = model.startChat({
//         generationConfig,
//         safetySettings,
//         history: conversation.map((item) => [
//           { role: 'user', parts: [{ text: item.user }] },
//           { role: 'model', parts: [{ text: item.bot }] },
//         ]).flat(),
//       });

//       const result = await chatSession.sendMessage(inputText);
//       const response = await result.response;

//       if (response.status === 'blocked') {
//         console.error('Response blocked due to potentially harmful content!');
//         return;
//       }

//       const text = await response.text();
//       // Update the conversation with the bot's actual response
//       const updatedConversation = [...conversation];
//       updatedConversation[currentIndex] = { user: inputText, bot: text, timestamp: new Date() };
//       setConversation(updatedConversation); // Update conversation history
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       setLoadingMessageIndex(null); // Reset loading index after response
//     }
//   };

//   useEffect(() => {
//     // Scroll to the end whenever the conversation updates
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true });
//     }
//   }, [conversation]);

//   const renderMessage = ({ item, index }) => (
//     <View style={styles.messageContainer}>
//       <View style={styles.userMessageContainer}>
//         <Text style={styles.userMessage}>{item.user}</Text>
//       </View>
//       <View style={styles.botMessageContainer}>
//         <Markdown style={styles.botMessage}>
//           {loadingMessageIndex === index ? ' ' : item.bot}
//         </Markdown>
//         {loadingMessageIndex === index && <ActivityIndicator size="small" color="green" style={styles.loadingIndicator} />}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {conversation.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Image
//             source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1995/1995541.png' }} // Example farmer logo URL
//             style={styles.logo}
//           />
//           <Text style={styles.description}>Welcome to FarmerGPT! Your AI assistant for farming tips and advice. Start chatting to ask your questions about farming.</Text>
//         </View>
//       ) : (
//         <FlatList
//           ref={flatListRef}
//           data={conversation}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={renderMessage}
//         />
//       )}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Type your message"
//           placeholderTextColor="#777"
//         />
//         <TouchableOpacity onPress={handleChatSubmission} disabled={loadingMessageIndex !== null}>
//           <Ionicons name="send" size={24} color={loadingMessageIndex !== null ? "#ccc" : "#000"} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//     marginTop: 40,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     flex: 1,
//     marginRight: 10,
//   },
//   messageContainer: {
//     marginBottom: 15,
//   },
//   userMessageContainer: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#fff',
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 8,
//     maxWidth: '80%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 10,
//   },
//   userMessage: {
//     color: '#333',
//   },
//   botMessageContainer: {
//     alignSelf: 'flex-start',
//     padding: 10,
//     borderRadius: 8,
//     maxWidth: '80%',
//     borderWidth: 1,
//     borderColor: '#7bb149',
//   },
//   botMessage: {
//     color: '#333',
//   },
//   loadingIndicator: {
//     marginTop: 5,
//     color:'black'
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//   },
// });

// export default FarmerGPT;




import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Markdown from 'react-native-markdown-display';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
const API_KEY = "AIzaSyATmTbYf_dzDTuu1QRAClT-b3JpIj9GOls"; // Replace with your Google API Key

const FarmerGPT = () => {
  const [conversation, setConversation] = useState([]); // Stores chat history
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(null); // Loading state for specific message
  const [inputText, setInputText] = useState(''); // Stores user input message
  const [timer, setTimer] = useState(0); // Timer state
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language selection
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false); // Modal state
  const flatListRef = useRef(null); // Reference to the FlatList
  const timerRef = useRef(null); // Reference to the timer interval

  const genAI = new GoogleGenerativeAI(API_KEY); // Initialize GoogleGenerativeAI with API Key

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  const handleChatSubmission = async () => {
    if (inputText.trim() === '') return; // Prevent sending empty messages

    const newMessage = { user: inputText, bot: '...', timestamp: new Date() };
    setConversation(prev => [...prev, newMessage]);
    const currentIndex = conversation.length;
    setLoadingMessageIndex(currentIndex);

    setInputText('');

    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 0.1);
    }, 100);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: `you are ai model named FarmerGPT specified for farmers alone. Provide your response in the selected language only: {${selectedLanguage}} .Dont give phonetic text along with the response only give in native language`,
      });

      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: conversation.map((item) => [
          { role: 'user', parts: [{ text: item.user }] },
          { role: 'model', parts: [{ text: item.bot }] },
        ]).flat(),
      });

      const result = await chatSession.sendMessage(inputText);
      const response = await result.response;

      if (response.status === 'blocked') {
        console.error('Response blocked due to potentially harmful content!');
        return;
      }

      const text = await response.text();
      const updatedConversation = [...conversation];
      updatedConversation[currentIndex] = { user: inputText, bot: text, timestamp: new Date() };
      setConversation(updatedConversation);
    } catch (error) {
      console.error(error.message);
    } finally {
      clearInterval(timerRef.current);
      setLoadingMessageIndex(null);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [conversation]);
  const handleDone = () => {
    // Close modal
    setLanguageModalVisible(false);

    // Show alert with selected language
    // Alert.alert('Language Selected', `You have selected ${selectedLanguage}.`, [
    //   { text: 'OK' },
      
    // ]);
    // navigation.navigate('Home');
    Toast.show({
      type: 'success',
      text1: 'Changed successfully ✅',
      text2: `${selectedLanguage} has been selected successfully!`,
      position: 'top',
      visibilityTime: 2000,
    });
  };


  const renderMessage = ({ item, index }) => (
    <View style={styles.messageContainer}>
      <View style={styles.userMessageContainer}>
        <Text style={styles.userMessage}>{item.user}</Text>
      </View>
      <View style={styles.botMessageContainer}>
        <Markdown style={styles.botMessage}>
          {loadingMessageIndex === index ? ' ' : item.bot}
        </Markdown>
        {loadingMessageIndex === index && (
          <View style={styles.loadingContainer}>
            <Text style={styles.timerText}>{timer.toFixed(1)}s</Text>
            <ActivityIndicator size="small" color="green" style={styles.loadingIndicator} />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {conversation.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1995/1995541.png' }} 
            style={styles.logos}
          />
          <Text style={styles.description}>Welcome to FarmerGPT! Your AI assistant for farming tips and advice. Start chatting to ask your questions about farming.</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={conversation}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message"
          placeholderTextColor="#777"
        />
        <TouchableOpacity onPress={handleChatSubmission} disabled={loadingMessageIndex !== null}>
          <Ionicons name="send" size={24} color={loadingMessageIndex !== null ? "#ccc" : "#000"} />
        </TouchableOpacity>
      </View>

      {/* Floating Button for Language Selector */}
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setLanguageModalVisible(true)}
      >
        <Ionicons name="language" size={24} color="white" />
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal
        visible={isLanguageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hindi" value="Hindi" />
              <Picker.Item label="Telugu" value="Telugu" />
              <Picker.Item label="Tamil" value="Tamil" />
              <Picker.Item label="Kannada" value="Kannada" />
              <Picker.Item label="Malayalam" value="Malayalam" />
              {/* <Picker.Item label="German" value="German" /> */}

            </Picker>
            <TouchableOpacity
              onPress={handleDone}
              style={styles.closeButton}
            >
              <Text  style={styles.closeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    flex: 1,
    marginRight: 10,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  userMessage: {
    color: '#333',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#7bb149',
  },
  botMessage: {
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timerText: {
    marginRight: 5,
    color: 'green',
  },
  loadingIndicator: {
    marginTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logos: {
    width: 120,
    height: 120,
    marginBottom: 20,
    // backgroundColor:'#2ecc71',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    backgroundColor:'#2ecc71',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
  },
  languageButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FarmerGPT;
