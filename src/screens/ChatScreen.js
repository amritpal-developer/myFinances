import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {sendMessageToChatGPT} from '../service/chatgptService';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {width} from '../utils/data';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
function ChatScreen({navigation}) {
  const AI_AVATAR =
    'https://images.unsplash.com/photo-1675252171739-d4e4d2e9b547?w=200&fit=crop';
  const USER_AVATAR =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop';
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef(null);
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone for voice recognition',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  requestMicrophonePermission();
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = {role: 'user', content: message, timestamp: new Date()};
    setChatHistory([...chatHistory, userMessage]);

    const botResponse = await sendMessageToChatGPT(message);
    const botMessage = {
      role: 'assistant',
      content: botResponse,
      timestamp: new Date(),
    };

    setChatHistory([...chatHistory, userMessage, botMessage]);
    setMessage('');
  };

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = event => setMessage(event.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };

  const stopListening = async () => {
    await Voice.stop();
    setIsListening(false);
  };

  const MessageBubble = ({message, isAI, timestamp}) => (
    <View
      style={[
        styles.messageBubble,
        isAI ? styles.aiMessage : styles.userMessage,
      ]}>
      {isAI && <Image source={{uri: AI_AVATAR}} style={styles.avatar} />}
      <View
        style={[
          styles.messageContent,
          isAI ? styles.aiMessageContent : styles.userMessageContent,
        ]}>
        <Text
          style={[
            styles.messageText,
            isAI ? styles.aiMessageText : styles.userMessageText,
          ]}>
          {message}
        </Text>
        <Text
          style={[
            styles.timestamp,
            isAI ? styles.aiTimestamp : styles.userTimestamp,
          ]}>
          {timestamp?.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      {!isAI && <Image source={{uri: USER_AVATAR}} style={styles.avatar} />}
    </View>
  );

  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.chatContainer}>
    //     {chatHistory.map((msg, index) => (
    //       <Text key={index} style={msg.role === 'user' ? styles.userText : styles.botText}>
    //         {msg.content}
    //       </Text>
    //     ))}
    //   </ScrollView>
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Type your message..."
    //       value={message}
    //       onChangeText={setMessage}
    //     />
    //     <Button title="Send" onPress={handleSendMessage} />
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Finance Assistant</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="exit-outline"
            size={30}
            color={'white'}
            style={styles.exit}
          />
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
        {chatHistory.map((message, index) => (
          <MessageBubble
            key={index}
            message={message?.content}
            isAI={message?.role === 'assistant' ? true : false}
            timestamp={message?.timestamp}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#666"
            multiline
          />
          {message ? (
            <TouchableOpacity
              style={[styles.sendButton, !message && styles.sendButtonDisabled]}
              onPress={handleSendMessage}
              disabled={!message}>
              <Ionicons
                name="send"
                size={24}
                color={message ? '#007AFF' : '#666'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={isListening ? stopListening : startListening}>
              <MaterialIcons
                name="keyboard-voice"
                size={30}
                color={'white'}
                style={styles.voice}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  exit: {
    marginEnd: '5%',
  },
  voice: {
    marginStart: '10%',
  },
  headerContent: {
    flexDirection: 'column',
    marginStart: '5%',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    marginRight: '5%',
    maxWidth: '80%',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  messageContent: {
    borderRadius: 20,
    padding: 12,
    paddingVertical: 8,
  },
  aiMessageContent: {
    backgroundColor: '#2C3E50',
  },
  userMessageContent: {
    backgroundColor: '#2980B9',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#E8E8E8',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  aiTimestamp: {
    color: '#95A5A6',
    alignSelf: 'flex-start',
  },
  userTimestamp: {
    color: '#BDC3C7',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    flex: 1,
    width: width,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: responsiveScreenHeight(5),
    marginRight: 8,
    color: '#fff',
    width: responsiveScreenWidth(82),
    fontSize: 16,
    // maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default React.memo(ChatScreen);
