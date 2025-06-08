import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DetailRecipeScreen() {
  const route = useRoute();
  const { receta } = route.params;
  const [porciones, setPorciones] = useState(receta.porciones || 10);

  const ajustarPorciones = (delta) => {
    LayoutAnimation.easeInEaseOut();
    setPorciones((prev) => Math.max(1, prev + delta));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={receta.image} style={styles.heroImage}>
        <TouchableOpacity style={styles.favoriteFloating}>
          <AntDesign name={receta.isFavorite ? 'heart' : 'hearto'} size={24} color="#e74c3c" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>{receta.title}</Text>
      </ImageBackground>

      <ScrollView style={styles.sheet} showsVerticalScrollIndicator={false}>
        <Text style={styles.desc}>{receta.desc}</Text>

        <View style={styles.userInfo}>
          <Image source={receta.userImage} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{receta.userName}</Text>
            <Text style={styles.userAlias}>{receta.userAlias} · {receta.ago}</Text>
          </View>
        </View>

        {/* Stats tipo Coursera */}
        <View style={styles.statBlock}>
          <Text style={styles.ratingText}>
            <Text style={styles.ratingNumber}>{receta.rating}</Text> <Text style={styles.ratingStar}>★</Text>
          </Text>
          <Text style={styles.statDetail}>({receta.reviews} reseñas)</Text>
        </View>

        <View style={styles.statBlock}>
          <Text style={styles.statTitle}>Nivel {receta.level}</Text>
          <Text style={styles.statDetail}>Experiencia recomendada</Text>
        </View>

        {/* Ingredientes */}
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {receta.ingredientes?.map((ing, i) => (
          <View key={i} style={styles.ingredientRow}>
            <View style={styles.bullet} />
            <Text style={styles.ingredient}>
              <Text style={styles.ingredientBold}>{ing.cantidad} {ing.unidad} </Text>
              {ing.nombre}
            </Text>
          </View>
        ))}

        {/* Ajuste de porciones */}
        <View style={styles.porcionesRow}>
          <Text style={styles.porcionesLabel}>Cantidad de porciones:</Text>
          <View style={styles.porcionesControl}>
            <TouchableOpacity onPress={() => ajustarPorciones(-1)}>
              <Feather name="minus-circle" size={22} color="#555" />
            </TouchableOpacity>
            <Text style={styles.porcionesText}>{porciones}</Text>
            <TouchableOpacity onPress={() => ajustarPorciones(1)}>
              <Feather name="plus-circle" size={22} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Paso a paso */}
        <Text style={styles.sectionTitle}>Paso a paso:</Text>
        {receta.pasos?.map((paso, index) => (
          <View key={index} style={styles.pasoContainer}>
            <View style={styles.pasoHeader}>
              <View style={styles.numeroCirculo}>
                <Text style={styles.numeroTexto}>{index + 1}</Text>
              </View>
              <Text style={styles.pasoTexto}>{paso.texto}</Text>
            </View>

            {paso.imagenes?.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pasoImagenesScroll}>
                {paso.imagenes.map((img, i) => (
                  <Image key={i} source={img} style={styles.pasoImagen} />
                ))}
              </ScrollView>
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroImage: {
    height: screenHeight * 0.4,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  favoriteFloating: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  sheet: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  statBlock: {
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingNumber: {
    fontWeight: 'bold',
  },
  ratingStar: {
    color: 'orange',
    fontSize: 18,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statDetail: {
    fontSize: 14,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
    marginRight: 8,
  },
  ingredient: {
    fontSize: 14,
    color: '#333',
  },
  ingredientBold: {
    fontWeight: 'bold',
  },
  porcionesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  porcionesLabel: {
    fontSize: 16,
    color: '#333',
  },
  porcionesControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  porcionesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  pasoContainer: {
    marginBottom: 20,
  },
  pasoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  numeroCirculo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numeroTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pasoTexto: {
    flex: 1,
    fontSize: 15,
    color: '#444',
  },
  pasoImagenesScroll: {
    paddingLeft: 38,
  },
  pasoImagen: {
    width: 140,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover',
  },
});
