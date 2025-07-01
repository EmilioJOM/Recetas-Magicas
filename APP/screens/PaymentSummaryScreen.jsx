import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getOrdenCompra } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function PaymentSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sede } = route.params || {}; // ← contiene la cátedra entera
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('efectivo');

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        console.log('Obteniendo orden para cátedra id:', sede?.id);
        const response = await getOrdenCompra(sede?.id, token); // ← PASA EL ID DE LA CÁTEDRA
        console.log('OrdenCompra data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener orden de compra:', error);
      }
    };
    if (sede?.id && token) fetchOrden();
  }, [sede, token]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Cargando resumen...</Text>
      </View>
    );
  }

  const totalConDescuento = data.precio * (1 - (data.descuentoCatedra || 0) / 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Resumen de inscripción</Text>

      {/* Medio de pago */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medio de pago</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPayment === 'efectivo' && styles.selectedOption,
          ]}
          onPress={() => setSelectedPayment('efectivo')}
        >
          <Icon name="money" size={20} color="#4CAF50" />
          <Text style={styles.paymentText}>Efectivo</Text>
        </TouchableOpacity>

        {data.MediosPago?.map((medio) => (
          <TouchableOpacity
            key={medio.id}
            style={[
              styles.paymentOption,
              selectedPayment === medio.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedPayment(medio.id)}
          >
            <Icon name="credit-card" size={20} color="#2196F3" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.paymentText}>
                **** **** **** {medio.numero.slice(-4)}
              </Text>
              <Text style={styles.subText}>Tipo: {medio.tipo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Descuento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descuento por sede</Text>
        <Text style={styles.discountText}>
          {data.sede} aplica un {data.descuentoCatedra || 0}% de descuento
        </Text>
        {data.promocionSede && (
          <Text style={styles.subText}>Promo: {data.promocionSede}</Text>
        )}
      </View>

      {/* Curso */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Curso</Text>
        <View style={styles.courseCard}>
          <Image source={{ uri: data.fotoCurso }} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{data.curso}</Text>
            <Text style={styles.courseDescription}>Curso intensivo con certificación oficial.</Text>
            <Text style={styles.coursePrice}>
              ${data.precio.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total con descuento:</Text>
        <Text style={styles.totalAmount}>${totalConDescuento.toLocaleString()}</Text>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Método de pago seleccionado:', selectedPayment);
          navigation.navigate('SuccessScreen');
        }}
      >
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
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
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
