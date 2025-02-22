import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { sendMessageToChatGPT } from '../service/chatgptService';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory([...chatHistory, userMessage]);

    const botResponse = await sendMessageToChatGPT(message);
    const botMessage = { role: 'assistant', content: botResponse };

    setChatHistory([...chatHistory, userMessage, botMessage]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((msg, index) => (
          <Text key={index} style={msg.role === 'user' ? styles.userText : styles.botText}>
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  chatContainer: { flex: 1 },
  userText: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', padding: 10, borderRadius: 8, marginVertical: 5 },
  botText: { alignSelf: 'flex-start', backgroundColor: '#EAEAEA', padding: 10, borderRadius: 8, marginVertical: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, padding: 5 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 10, marginRight: 5 },
});

export default React.memo(ChatScreen);
