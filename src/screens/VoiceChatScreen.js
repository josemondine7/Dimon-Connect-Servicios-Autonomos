import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function VoiceChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy Lira, asistente de Dimon Connect. Estoy conectada a la base de datos y servidores. ¿En qué te ayudo?', sender: 'lira', time: '7:27' }
  ]);
  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Recibido. Conectando con Supabase y GitHub... Todo en orden. ¿Necesitás algo más?',
        sender: 'lira',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }, 1200);
  };

  return (
    <LinearGradient colors={['#23329D', '#101C5D']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Lira — Asistente</Text>
              <Text style={styles.headerStatus}>🟢 Conectada · Supabase · GitHub</Text>
            </View>
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={22} color="#00E5FF" />
            </TouchableOpacity>
          </View>

          <ScrollView ref={scrollViewRef} style={styles.messagesContainer} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
            {messages.map(msg => (
              <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.liraBubble]}>
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Escribile a Lira..." placeholderTextColor="rgba(255,255,255,0.5)" value={message} onChangeText={setMessage} onSubmitEditing={sendMessage} />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  backButton: { padding: 5 },
  headerInfo: { flex: 1, marginLeft: 10 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerStatus: { color: '#00E5FF', fontSize: 11, marginTop: 2 },
  voiceButton: { padding: 8, backgroundColor: 'rgba(0,229,255,0.15)', borderRadius: 20 },
  messagesContainer: { flex: 1, padding: 15 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 18, marginBottom: 10 },
  userBubble: { backgroundColor: '#2563EB', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  liraBubble: { backgroundColor: 'rgba(255,255,255,0.15)', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  messageText: { color: 'white', fontSize: 15, lineHeight: 20 },
  messageTime: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  inputContainer: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  input: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 25, paddingHorizontal: 18, paddingVertical: 10, color: 'white', fontSize: 15 },
  sendButton: { marginLeft: 10, width: 42, height: 42, borderRadius: 21, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' }
});
