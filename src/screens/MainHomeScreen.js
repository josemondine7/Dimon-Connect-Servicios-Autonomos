import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function MainHomeScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState('Montevideo, UY');

  return (
    <LinearGradient colors={['#3454CC', '#23329D']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.mapContainer}>
            <Image source={require('../../assets/world_map_dots.png')} style={styles.mapImage} resizeMode="contain" />
          </View>

          <View style={styles.headerContainer}>
            <Image source={require('../../assets/diamond_logo.png')} style={styles.logoImage} resizeMode="contain" />
            <Text style={styles.titleText}>Dimon Connect</Text>
            <Text style={styles.subtitleText}>Servicios Autónomos · Conexión Global</Text>
            <View style={styles.locationTag}>
              <Ionicons name="location-sharp" size={14} color="#00E5FF" />
              <Text style={styles.locationText}>{userLocation} (Cercanos)</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="white" />
            <TextInput style={styles.searchInput} placeholder="¿Qué servicio buscás hoy?" placeholderTextColor="white" />
          </View>

          <TouchableOpacity style={styles.serviceButtonDark} onPress={() => navigation.navigate('Transactions')}>
            <LinearGradient colors={['#101C5D', '#0C1147']} style={styles.serviceButtonGradient}>
              <Text style={styles.serviceMainText}>NECESITO UN SERVICIO</Text>
              <Text style={styles.serviceSubText}>Encontrá profesionales cerca tuyo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceButtonOutline}>
            <Text style={styles.serviceOutlineText}>OFREZCO MIS SERVICIOS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.offerButton} onPress={() => navigation.navigate('VoiceChat')}>
            <LinearGradient colors={['#172278', '#0F135A']} style={styles.offerButtonGradient}>
              <View style={styles.offerIconCircle}>
                <Ionicons name="mic-outline" size={32} color="#00E5FF" />
              </View>
              <View style={styles.offerTextContainer}>
                <Text style={styles.offerMainText}>Asistente y Búsqueda</Text>
                <Text style={styles.offerSubText}>Consultá o publicá con voz</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footerLinks}>
            <Text style={styles.footerLinkText}>Normas y Seguridad</Text>
            <View style={styles.footerDivider} />
            <Text style={styles.footerLinkText}>Ley 18.600 UY</Text>
            <View style={styles.footerDivider} />
            <Text style={styles.footerLinkText}>Privacidad</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingHorizontal: 25, alignItems: 'center', paddingBottom: 30 },
  mapContainer: { width: '100%', height: 140, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  mapImage: { width: '100%', height: '100%', opacity: 0.6 },
  headerContainer: { alignItems: 'center', marginBottom: 25 },
  logoImage: { width: 75, height: 75, marginBottom: 8 },
  titleText: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  subtitleText: { fontSize: 14, color: '#D1E6F9', marginTop: 2 },
  locationTag: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: 'rgba(0, 229, 255, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  locationText: { color: 'white', fontSize: 12, marginLeft: 5, fontWeight: '500' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', borderRadius: 25, width: '100%', height: 48, paddingHorizontal: 15, marginBottom: 20 },
  searchInput: { flex: 1, color: 'white', fontSize: 15, marginLeft: 10 },
  serviceButtonDark: { width: '100%', borderRadius: 15, overflow: 'hidden', marginBottom: 15 },
  serviceButtonGradient: { padding: 18, alignItems: 'center' },
  serviceMainText: { fontSize: 17, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  serviceSubText: { fontSize: 13, color: '#D1E6F9', marginTop: 3 },
  serviceButtonOutline: { width: '100%', padding: 18, borderRadius: 15, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', marginBottom: 15 },
  serviceOutlineText: { fontSize: 16, color: 'white', fontWeight: '500' },
  offerButton: { width: '100%', borderRadius: 18, overflow: 'hidden', marginBottom: 30 },
  offerButtonGradient: { flexDirection: 'row', padding: 18, alignItems: 'center' },
  offerIconCircle: { width: 55, height: 55, borderRadius: 27.5, borderWidth: 1.5, borderColor: '#00E5FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  offerTextContainer: { flex: 1 },
  offerMainText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  offerSubText: { fontSize: 13, color: '#D1E6F9', marginTop: 2 },
  footerLinks: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: 10 },
  footerLinkText: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  footerDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 8 }
});

