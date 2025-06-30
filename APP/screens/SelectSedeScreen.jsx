import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import HorizontalCards from '../components/HorizontalCards';

const sedesData = [
  { id: 1, title: 'Sede Buenos Aires', image: require('../assets/sede_ba.jpg') },
  { id: 2, title: 'Sede Córdoba', image: require('../assets/sede_cba.jpg') },
  { id: 3, title: 'Sede Rosario', image: require('../assets/sede_rosario.jpg') },
  { id: 4, title: 'Sede Mendoza', image: require('../assets/sede_mendoza.jpg') },
  { id: 5, title: 'Sede Mar del Plata', image: require('../assets/sede_mdq.jpg') },
  { id: 6, title: 'Sede La Plata', image: require('../assets/sede_laplata.jpg') },
  // podés agregar más sedes acá
];

export default function SelectSedeScreen() {
  const [selectedSedeId, setSelectedSedeId] = useState(null);

  const handleSelectSede = (item) => {
    setSelectedSedeId(item.id);
    Alert.alert('Sede seleccionada', `Elegiste: ${item.title}`);
    // Acá podrías navegar o guardar la selección globalmente
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Elegí tu sede</Text>
      <HorizontalCards
        title="Nuestras sedes"
        data={sedesData}
        onItemPress={handleSelectSede}
      />
      {selectedSedeId && (
        <Text style={styles.selectedText}>
          Sede seleccionada: {sedesData.find(s => s.id === selectedSedeId)?.title}
        </Text>
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
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#E08D3E',
    textAlign: 'center',
  },
});
