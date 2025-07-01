import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import SedeCard from '../components/SedeCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCatedraByCourseId } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function SelectSedeScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const [sedes, setSedes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params || {};
  const { token } = useAuth();

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        console.log('Course ID:', courseId);
        console.log('Token:', token);
        const response = await getCatedraByCourseId(courseId, token);
        console.log('Sedes recibidas:', response.data);
        setSedes(response.data);
      } catch (error) {
        console.error('Error al obtener las sedes:', error);
      }
    };
    if (courseId && token) {
      fetchSedes();
    }
  }, [courseId, token]);

  const onSelect = (item) => {
    setSelectedId(item.id);
    Alert.alert('Sede seleccionada', `Elegiste: ${item.sedeNombre}`, [
      {
        text: 'Continuar al pago',
        onPress: () => navigation.navigate('PaymentSummaryScreen', { sede: item }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Elegí tu sede</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sedes.map((sede) => (
          <SedeCard
            key={sede.id}
            title={sede.sedeNombre}
            direccion={sede.sedeDireccion}
            ciudad={'Ubicación: ' + (sede.ubicacion || 'No especificada')}
            image={{ uri: sede.sedeMainPhoto }}
            userImage={require('../assets/FotoPerfil1.jpg')}
            userName={`Vacantes: ${sede.vacantes}`}
            userAlias={`Promo: ${sede.promotion}%`}
            onPress={() => onSelect(sede)}
          />
        ))}
      </ScrollView>
      {selectedId && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Sede seleccionada: {sedes.find(s => s.id === selectedId)?.sedeNombre}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 16,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  selectedContainer: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E08D3E',
  },
});
