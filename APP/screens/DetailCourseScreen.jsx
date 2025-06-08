import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetailCourseScreen() {
  const route = useRoute();
  const { receta } = route.params; // acá accedés a lo que le pasaste

  return (
    <View style={styles.container}>
      <Image source={receta.image} style={styles.image} />
      <Text style={styles.title}>{receta.title}</Text>
      {/* Más info si tuvieras descripción, ingredientes, etc */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
