import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../context/AuthContext';
import { getOrdenCompra, inscribirseCurso, pagarCurso } from '../api/auth';

export default function PaymentSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sede } = route.params || {}; // viene de la screen anterior
  const { token } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState('efectivo');
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const response = await getOrdenCompra(sede.id, token);
        console.log('Orden:', response.data);
        setOrden(response.data);
      } catch (error) {
        console.error('Error al obtener la orden de compra:', error);
        Alert.alert('Error', 'No se pudo cargar el resumen de inscripción.');
      }
    };
    if (sede?.id && token) {
      fetchOrden();
    }
  }, [sede, token]);

  const handleSubmit = async () => {
    try {
      if (selectedPayment === 'efectivo') {
        await inscribirseCurso(orden.catedraID, token);
      } else {
        const medioPagoId = orden?.MediosPago?.[0]?.id;
        if (!medioPagoId) throw new Error('No hay tarjeta disponible');
        await pagarCurso(orden.catedraID, medioPagoId, token);
      }
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error al procesar inscripción/pago:', error);
      Alert.alert('Error', 'No se pudo completar la inscripción.');
    }
  };

  if (!orden) return null;

  const totalConDescuento = orden.precio * (1 - (orden.descuentoCatedra || 0) / 100);

  const tarjeta = orden.MediosPago?.[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Resumen de inscripción</Text>

      {/* Medio de pago */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medio de pago</Text>

        <TouchableOpacity
          style={[styles.paymentOption, selectedPayment === 'efectivo' && styles.selectedOption]}
          onPress={() => setSelectedPayment('efectivo')}
        >
          <Icon name="money" size={20} color="#4CAF50" />
          <Text style={styles.paymentText}>Efectivo</Text>
        </TouchableOpacity>

        {tarjeta && (
          <TouchableOpacity
            style={[styles.paymentOption, selectedPayment === 'tarjeta' && styles.selectedOption]}
            onPress={() => setSelectedPayment('tarjeta')}
          >
            <Icon name="credit-card" size={20} color="#2196F3" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.paymentText}>{tarjeta.numero}</Text>
              <Text style={styles.subText}>Tipo: {tarjeta.tipo}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Descuento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descuento por sede</Text>
        <Text style={styles.discountText}>
          {orden.sede} aplica un {orden.descuentoCatedra}% de descuento
        </Text>
        {orden.promocionSede && (
          <Text style={styles.subText}>Promoción: {orden.promocionSede}</Text>
        )}
      </View>

      {/* Curso */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Curso</Text>
        <View style={styles.courseCard}>
          <Image source={{ uri: orden.fotoCurso }} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{orden.curso}</Text>
            <Text style={styles.coursePrice}>${orden.precio.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total con descuento:</Text>
        <Text style={styles.totalAmount}>${totalConDescuento.toLocaleString()}</Text>
      </View>

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>💳 Confirmar e inscribirse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#E08D3E',
    backgroundColor: '#FFF4E8',
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: '#444',
  },
  subText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 10,
  },
  discountText: {
    fontSize: 16,
    color: '#E08D3E',
    fontWeight: '500',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
  },
  courseInfo: {
    flex: 1,
    padding: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E08D3E',
  },
  button: {
    backgroundColor: '#E08D3E',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});