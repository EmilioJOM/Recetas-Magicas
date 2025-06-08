import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const imagenes = [
  { id: '1', image: require('../assets/Shawarma.jpg'), title: 'Curso de Cocina Árabe' },
  { id: '2', image: require('../assets/pizza1.jpg'), title: 'Curso de Pizzas' },
  { id: '3', image: require('../assets/Costilla.jpg'), title: 'Curso de Parrilla' },
  { id: '4', image: require('../assets/burguer.jpg'), title: 'Curso de Hamburguesas' },
  { id: '5', image: require('../assets/platoDeFideos.jpg'), title: 'Curso de Pastas' },
];

export default function RecipeSearchCard({
  title,
  image,
  rating = 4.8,
  reviews = 500,
  level = 'Intermedio',
  userImage,
  userName = 'Nombre Apellido',
  userAlias = '@usuario',
  onPress
}) {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>
          <Icon name="star-o" size={14} color="#555" />
          <Text style={styles.metaText}> {rating} ({reviews} reseñas)</Text>

          <MaterialIcon name="bar-chart" size={16} color="#666" style={{ marginLeft: 12 }} />
          <Text style={styles.metaText}> Nivel {level.toLowerCase()}</Text>
        </View>

        <View style={styles.userRow}>
          <View style={styles.userInfo}>
            <Image source={userImage} style={styles.userImage} />
            <View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userAlias}>{userAlias}</Text>
            </View>
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
    backgroundColor: '#fff',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 14,
    color: '#555',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  userAlias: {
    fontSize: 12,
    color: '#666',
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
