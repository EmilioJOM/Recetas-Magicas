import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SedeCard({
  title,
  direccion,
  ciudad,
  image,
  onPress,
}) {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.locationText}>{direccion}</Text>
            <Text style={styles.locationText}>{ciudad}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
