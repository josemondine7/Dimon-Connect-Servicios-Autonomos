import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const CORRECT_PASSWORD = 'Prometeo_Atenas_Ades';

  const handleLogin = () => {
    if (password.trim() === CORRECT_PASSWORD) {
      navigation.navigate('MainHome');
    } else if (password.trim() !== '') {
      Alert.alert('Acceso', 'Clave incorrecta. Verificá tu contraseña.');
    } else {
      Alert.alert('Acceso', 'Por favor ingresá tu contraseña.');
    }
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometría', 'Huella no disponible. Usá la contraseña.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Acceder a Dimon Connect',
      fallbackLabel: 'Usar contraseña',
    });
    if (result.success) navigation.navigate('MainHome');
  };

  return (
    <LinearGradient colors={['#3454CC', '#23329D']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/diamond_logo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.titleText}>Dimon Connect</Text>
          <Text style={styles.subtitleText}>Servicios Autónomos · Mundial</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="white" />
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="rgba(255,255,255,0.6)" secureTextEntry value={password} onChangeText={setPassword} onSubmitEditing={handleLogin} />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient colors={['#101C5D', '#0C1147']} style={styles.buttonGradient}>
              <Text style={styles.loginButtonText}>INGRESAR</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <Ionicons name="finger-print" size={44} color="#00E5FF" />
            <Text style={styles.biometricText}>Ingresar con Huella Digital</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.legalText}>
          Propiedad de José María Mondine Lemos · CI 43433929{'\n'}
          Sucesora universal: Taina Mondine Doldan · Ley 18.600 Uruguay
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30, alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoImage: { width: 95, height: 95, marginBottom: 10 },
  titleText: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitleText: { fontSize: 16, color: '#D1E6F9', marginTop: 4 },
  formContainer: { width: '100%', alignItems: 'center' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 25, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 15, height: 50, width: '100%', marginBottom: 20 },
  input: { flex: 1, color: 'white', fontSize: 16, marginLeft: 10 },
  loginButton: { width: '100%', borderRadius: 25, overflow: 'hidden', marginBottom: 25 },
  buttonGradient: { height: 50, justifyContent: 'center', alignItems: 'center' },
  loginButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  biometricButton: { alignItems: 'center', marginVertical: 10 },
  biometricText: { color: '#00E5FF', marginTop: 8, fontSize: 14, fontWeight: '500' },
  legalText: { color: 'rgba(255,255,255,0.6)', fontSize: 10, textAlign: 'center', position: 'absolute', bottom: 20, paddingHorizontal: 20, lineHeight: 16 }
});
