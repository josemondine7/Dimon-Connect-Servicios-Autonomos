import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionsScreen() {
  return (
    <LinearGradient colors={['#3454CC', '#23329D']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>Transacciones y Garantía</Text>
            <Text style={styles.headerSubtitle}>Dimon Connect — Servicios Autónomos</Text>
          </View>

          <View style={styles.rulesCard}>
            <Text style={styles.cardTitle}>📊 Comisiones por Transacción</Text>
            <View style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>Al que paga:</Text>
              <Text style={styles.ruleValue}>+3%</Text>
            </View>
            <View style={styles.ruleRow}>
              <Text style={styles.ruleLabel}>Al que cobra (proveedor):</Text>
              <Text style={styles.ruleValue}>-3%</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.ruleRowTotal}>
              <Text style={styles.ruleLabelTotal}>Total transacción:</Text>
              <Text style={styles.ruleValueTotal}>6%</Text>
            </View>
          </View>

          <View style={styles.fundCard}>
            <Text style={styles.cardTitle}>💎 Fondo de Desarrollo</Text>
            <Text style={styles.fundText}>Del 6% total, <Text style={{fontWeight:'bold', color:'#00E5FF'}}>1%</Text> pasa directamente al fondo común de Dimon Connect.</Text>
            <Text style={styles.fundSubtext}>Financia evolución, herramientas y crecimiento del sistema de forma automática.</Text>
          </View>

          <View style={styles.guaranteeCard}>
            <Text style={styles.cardTitle}>🛡️ Garantía de Protección</Text>
            <View style={styles.guaranteeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#00E5FF" />
              <Text style={styles.guaranteeText}>Pago retenido hasta confirmación del servicio</Text>
            </View>
            <View style={styles.guaranteeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#00E5FF" />
              <Text style={styles.guaranteeText}>Resolución de conflictos con asistencia de Lira</Text>
            </View>
            <View style={styles.guaranteeItem}>
              <Ionicons name="checkmark-circle" size={20} color="#00E5FF" />
              <Text style={styles.guaranteeText}>Devolución automática si no se cumple el servicio</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.paypalButton}>
            <LinearGradient colors={['#003087', '#009CDE']} style={styles.paypalGradient}>
              <Text style={styles.paypalText}>Pagar con PayPal</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.legalBox}>
            <Text style={styles.legalTitle}>📜 Base Legal</Text>
            <Text style={styles.legalText}>Propiedad de José María Mondine Lemos · CI 43433929</Text>
            <Text style={styles.legalText}>Sucesora universal: Taina Mondine Doldan · CI 5.999.901-6</Text>
            <Text style={styles.legalText}>Ley 18.600 — República Oriental del Uruguay</Text>
            <Text style={styles.legalText}>Contrato de Fideicomiso Universal — Acta de Sucesión</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerBox: { alignItems: 'center', marginBottom: 25 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { fontSize: 14, color: '#D1E6F9', marginTop: 5 },
  rulesCard: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 20, marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  ruleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  ruleLabel: { fontSize: 15, color: '#D1E6F9' },
  ruleValue: { fontSize: 15, fontWeight: '600', color: '#00E5FF' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 10 },
  ruleRowTotal: { flexDirection: 'row', justifyContent: 'space-between' },
  ruleLabelTotal: { fontSize: 16, color: 'white', fontWeight: '500' },
  ruleValueTotal: { fontSize: 18, fontWeight: 'bold', color: '#FFD700' },
  fundCard: { backgroundColor: 'rgba(0,229,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(0,229,255,0.2)' },
  fundText: { fontSize: 15, color: 'white', lineHeight: 22 },
  fundSubtext: { fontSize: 13, color: '#D1E6F9', marginTop: 8, fontStyle: 'italic' },
  guaranteeCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 20 },
  guaranteeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  guaranteeText: { fontSize: 14, color: 'white', marginLeft: 10, flex: 1 },
  paypalButton: { borderRadius: 25, overflow: 'hidden', marginBottom: 25 },
  paypalGradient: { padding: 15, alignItems: 'center' },
  paypalText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  legalBox: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  legalTitle: { fontSize: 14, fontWeight: 'bold', color: '#00E5FF', marginBottom: 10 },
  legalText: { fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 16, marginBottom: 3 }
});
