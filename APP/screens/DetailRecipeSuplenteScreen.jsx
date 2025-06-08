import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetailRecipeSuplenteScreen() {
  const route = useRoute();
  const { receta } = route.params;

  return (
    <View style={styles.container}>
      {/* Imagen principal con overlay y título */}
      <ImageBackground source={receta.image} style={styles.imageBackground}>
        <View style={styles.overlay} />
        <Text style={styles.imageTitle}>{receta.title}</Text>
      </ImageBackground>

      {/* Contenido */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.desc}>{receta.desc}</Text>

        {/* Usuario */}
        <View style={styles.userInfo}>
          <Image source={receta.userImage} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{receta.userName}</Text>
            <Text style={styles.userAlias}>{receta.userAlias} · {receta.ago}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AntDesign name="star" size={20} color="#f1c40f" />
            <Text style={styles.statText}>{receta.rating} ({receta.reviews})</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#555" />
            <Text style={styles.statText}>Nivel: {receta.level}</Text>
          </View>
        </View>

        {/* Info extra */}
        <Text style={styles.subHeader}>XP recomendada: 1000</Text>
        <Text style={styles.subHeader}>🍽️ Porciones: {receta.porciones || '10'}</Text>

        {/* Ingredientes */}
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {receta.ingredientes?.map((ing, i) => (
          <Text key={i} style={styles.ingredient}>• {ing}</Text>
        ))}

        {/* Paso a paso */}
        <Text style={styles.sectionTitle}>Paso a paso:</Text>
        <Text style={styles.step}>1. Preparar ingredientes</Text>
        <Text style={styles.step}>2. Cocinar según receta</Text>
        <Text style={styles.step}>3. Servir y disfrutar</Text>

        {/* Botón favoritos */}
        <TouchableOpacity style={styles.favoriteBtn}>
          <AntDesign name="hearto" size={22} color="#e74c3c" />
          <Text style={styles.favoriteText}>Agregar a favoritos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    height: 300,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 16,
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  desc: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userAlias: {
    color: '#888',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 14,
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 6,
  },
  ingredient: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 2,
  },
  step: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 10,
  },
  favoriteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffecec',
    padding: 12,
    marginTop: 25,
    borderRadius: 12,
    alignSelf: 'center',
  },
  favoriteText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
  },
});
