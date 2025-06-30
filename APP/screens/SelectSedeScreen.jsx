import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import SedeCard from '../components/SedeCard';
import { useNavigation } from '@react-navigation/native';
const sedes = [
  {
    id: '1',
    title: 'Sede Buenos Aires',
    direccion: 'Av. Corrientes 1234',
    ciudad: 'Buenos Aires',
    image: require('../assets/Lasagna.jpg'),
    userImage: require('../assets/FotoPerfil1.jpg'),
    userName: 'Juan Pérez',
    userAlias: '@juanp',
  },
  // ... las otras sedes igual
];

export default function SelectSedeScreen() {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();

  const onSelect = (item) => {
    setSelectedId(item.id);
    Alert.alert('Sede seleccionada', `Elegiste: ${item.title}`, [
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
            title={sede.title}
            direccion={sede.direccion}
            ciudad={sede.ciudad}
            image={sede.image}
            userImage={sede.userImage}
            userName={sede.userName}
            userAlias={sede.userAlias}
            onPress={() => onSelect(sede)}
          />
        ))}
      </ScrollView>
      {selectedId && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Sede seleccionada: {sedes.find(s => s.id === selectedId)?.title}
          </Text>
        </View>
      )}
    </View>
  );
}

// estilos iguales a los anteriores
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
