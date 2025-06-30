import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PaymentSummaryScreen() {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState('efectivo'); // default seleccionado

  const sede = {
    nombre: 'Sede Buenos Aires',
    descuento: 30,
  };

  const curso = {
    nombre: 'Curso de Pastelería Profesional',
    descripcion: 'Aprendé técnicas avanzadas de repostería en 3 meses.',
    precio: 60000,
    imagen: require('../assets/Rabioles.jpg'),
  };

  const tarjetaRegistrada = {
    numero: '**** **** **** 1234',
    nombre: 'Juan Pérez',
    vencimiento: '12/27',
  };

  const totalConDescuento = curso.precio * (1 - sede.descuento / 100);

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

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPayment === 'tarjeta' && styles.selectedOption,
          ]}
          onPress={() => setSelectedPayment('tarjeta')}
        >
          <Icon name="credit-card" size={20} color="#2196F3" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.paymentText}>{tarjetaRegistrada.numero}</Text>
            <Text style={styles.subText}>a nombre de {tarjetaRegistrada.nombre}</Text>
            <Text style={styles.subText}>Vence: {tarjetaRegistrada.vencimiento}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Descuento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descuento por sede</Text>
        <Text style={styles.discountText}>
          {sede.nombre} aplica un {sede.descuento}% de descuento
        </Text>
      </View>

      {/* Curso */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Curso</Text>
        <View style={styles.courseCard}>
          <Image source={curso.imagen} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{curso.nombre}</Text>
            <Text style={styles.courseDescription}>{curso.descripcion}</Text>
            <Text style={styles.coursePrice}>
              ${curso.precio.toLocaleString()}
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
          // Acá podrías enviar al backend el método de pago seleccionado
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
