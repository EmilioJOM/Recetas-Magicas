import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { getRecipeById } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const screenHeight = Dimensions.get('window').height;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function MinimalLoading() {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#555" />
        <Text style={styles.loadingText}>Cocinando la magia...</Text>
      </View>
    </View>
  );
}

export default function DetailRecipeScreen() {
  const route = useRoute();
  const { id } = route.params;
  const { token } = useAuth();

  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);

  const [porciones, setPorciones] = useState(1);
  const [porcionesBase, setPorcionesBase] = useState(1);
  const [ingredientesBase, setIngredientesBase] = useState([]);

  useEffect(() => {
    const fetchReceta = async () => {
      try {
        const response = await getRecipeById(id);
        const data = response.data;

        setReceta(data);

        const baseServings = data.servings || 1;
        setPorcionesBase(baseServings);
        setPorciones(baseServings);

        setIngredientesBase(data.ingredients || []);
      } catch (error) {
        console.error('Error al cargar receta:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReceta();
  }, [id]);

  const ajustarPorciones = (delta) => {
    LayoutAnimation.easeInEaseOut();
    setPorciones((prev) => Math.max(1, prev + delta));
  };

  const ingredientesAjustados = ingredientesBase.map((ing) => {
    const factor = porciones / porcionesBase;
    let cantidadAjustada = ing.quantity * factor;
    cantidadAjustada =
      cantidadAjustada % 1 === 0
        ? cantidadAjustada.toString()
        : cantidadAjustada.toFixed(2);
    return {
      ...ing,
      cantidadAjustada,
    };
  });

  const guardarReceta = async () => {
    try {
      // Guardamos la receta completa, con las porciones actuales y los ingredientes ajustados
      const recetaAGuardar = {
        ...receta,
        porcionesActuales: porciones,
        ingredientesAjustados,
      };
      await AsyncStorage.setItem('receta_guardada', JSON.stringify(recetaAGuardar));
      Alert.alert('¡Éxito!', 'Receta guardada en tu dispositivo.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la receta. Intenta nuevamente.');
      console.error('Error guardando receta:', error);
    }
  };

  if (loading || !receta) {
    return <MinimalLoading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: receta.mainPhoto }} style={styles.heroImage}>
        <TouchableOpacity style={styles.favoriteFloating}>
          <AntDesign name={receta.isFavorite ? 'heart' : 'hearto'} size={24} color="#e74c3c" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>{receta.title}</Text>
      </ImageBackground>

      <ScrollView style={styles.sheet} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 80}}>
        <Text style={styles.desc}>{receta.description}</Text>

        <View style={styles.userInfo}>
          <Image source={require('../assets/FotoPerfil1.jpg')} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{receta.email}</Text>
            <Text style={styles.userAlias}>{receta.authorAlias} · {receta.ago}</Text>
          </View>
        </View>

        <View style={styles.statBlock}>
          <Text style={styles.ratingText}>
            <Text style={styles.ratingNumber}>{4.8}</Text> <Text style={styles.ratingStar}>★</Text>
          </Text>
          <Text style={styles.statDetail}>({250} reseñas)</Text>
        </View>

        <View style={styles.statBlock}>
          <Text style={styles.statTitle}>Nivel {receta.experienceLevel}</Text>
          <Text style={styles.statDetail}>Experiencia recomendada</Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {ingredientesAjustados.map((ing, i) => (
          <View key={i} style={styles.ingredientRow}>
            <View style={styles.bullet} />
            <Text style={styles.ingredient}>
              <Text style={styles.ingredientBold}>{ing.cantidadAjustada} {ing.unit} </Text>
              {ing.detail}
            </Text>
          </View>
        ))}

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

        <Text style={styles.sectionTitle}>Paso a paso:</Text>
        {receta.steps?.map((paso, index) => (
          <View key={index} style={styles.pasoContainer}>
            <View style={styles.pasoHeader}>
              <View style={styles.numeroCirculo}>
                <Text style={styles.numeroTexto}>{index + 1}</Text>
              </View>
              <Text style={styles.pasoTexto}>{paso.instruction}</Text>
            </View>
            {paso.media?.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pasoImagenesScroll}>
                {paso.media.map((img, i) => (
                  <Image key={i} source={{ uri: img.urlContenido }} style={styles.pasoImagen} />
                ))}
              </ScrollView>
            )}
          </View>
        ))}

        {/* Espacio para que el botón no tape contenido */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Botón facha "Guardar receta" fijo abajo */}
      <TouchableOpacity style={styles.botonGuardar} onPress={guardarReceta} activeOpacity={0.8}>
        <Text style={styles.textoBotonGuardar}>Guardar receta</Text>
      </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
   botonGuardar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f39c12', // naranja brillante
    borderRadius: 8, // bordes cuadrados con un poco de redondeo
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#f39c12',
    //shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  textoBotonGuardar: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
