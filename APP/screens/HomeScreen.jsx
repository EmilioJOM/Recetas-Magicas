import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SearchBarWithFilters from '../components/SearchBarWithFilters';
import ImageCarousel from '../components/ImageCarousel';
import LatestRecipesPreview from '../components/LatestRecipesPreview';
import HorizontalCards from '../components/HorizontalCards';
import BottomTabs from '../components/BottomTabs';
import RecipeOrCourseCard from '../components/RecipeOrCourseCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getLatestRecipes, getRecipes, getCourses, searchReceta } from '../api/auth';

const imagenes = [
  { id: '1', image: require('../assets/Shawarma.jpg'), title: 'Curso de Cocina Árabe' },
  { id: '2', image: require('../assets/pizza1.jpg'), title: 'Curso de Pizzas' },
  { id: '3', image: require('../assets/Costilla.jpg'), title: 'Curso de Parrilla' },
  { id: '4', image: require('../assets/burguer.jpg'), title: 'Curso de Hamburguesas' },
  { id: '5', image: require('../assets/platoDeFideos.jpg'), title: 'Curso de Pastas' },
];

export default function HomeScreen() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recetasFiltradas, setRecetasFiltradas] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [ingredientesExcluidos, setIngredientesExcluidos] = useState([]);

  const filtros = ['Todos', 'Favoritos', 'Modificadas', 'Mis Cursos', 'Tipo', 'Usuario', 'Ingrediente'];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const response = await getLatestRecipes();
        setLatestRecipes(response.data);
      } catch (error) {
        console.error('Error al traer las últimas recetas', error);
      }
    };
    fetchLatestRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        setAllRecipes(response.data);
      } catch (error) {
        console.error('Error al traer las recetas', error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error('Error al traer los cursos', error);
      }
    };
    fetchCourses();
  }, []);

  const hayBusquedaOFiltro =
    searchText.length > 0 || (selectedFilter !== 'Todos' && selectedFilter !== '');

  useEffect(() => {
    const hayFiltrosSecundarios =
      tiposSeleccionados.length > 0 || usuarioFiltro.trim().length > 0 || ingredientesSeleccionados.length > 0 || ingredientesExcluidos.length > 0;

    if ((searchText.length > 0 || hayFiltrosSecundarios) && selectedFilter === 'Todos') {
      setSelectedFilter('');
    }
  }, [searchText, tiposSeleccionados, usuarioFiltro, ingredientesSeleccionados, ingredientesExcluidos]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter !== 'Tipo') setTiposSeleccionados([]);
    if (filter === 'Todos' || filter === 'Mis Cursos') {
      setUsuarioFiltro('');
      setIngredientesSeleccionados([]);
      setIngredientesExcluidos([]);
    }
  };

  useEffect(() => {
    const fetchFiltradas = async () => {
      if (!hayBusquedaOFiltro) return;

      const filtros = {
        query: searchText || null,
        favoritos: selectedFilter === 'Favoritos',
        tipoReceta: tiposSeleccionados.length > 0 ? tiposSeleccionados : null,
        autorId: usuarioFiltro.trim() !== '' ? usuarioFiltro.trim() : null,
        ingredientesIncluidos: ingredientesSeleccionados.length > 0 ? ingredientesSeleccionados : null,
        ingredientesExcluidos: ingredientesExcluidos.length > 0 ? ingredientesExcluidos : null,
      };

      try {
        console.log('Enviando filtros:', filtros);
        const response = await searchReceta(filtros);
        setRecetasFiltradas(response.data);
      } catch (error) {
        console.error('Error al buscar recetas:', error);
      }
    };

    fetchFiltradas();
  }, [
    searchText,
    selectedFilter,
    tiposSeleccionados,
    usuarioFiltro,
    ingredientesSeleccionados,
    ingredientesExcluidos,
  ]);


  const resetTipos = () => setTiposSeleccionados([]);
  const resetUsuarios = () => setUsuarioFiltro('');
  const resetIngredientes = () => setIngredientesSeleccionados([]);
  const resetIngredientesExcluidos = () => setIngredientesExcluidos([]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 50 }]}
      >
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <SearchBarWithFilters
            searchText={searchText}
            onSearchChange={setSearchText}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            filtros={filtros}
            tiposSeleccionados={tiposSeleccionados}
            setTiposSeleccionados={setTiposSeleccionados}
            tiposDisponibles={[
              'Pastas', 'Comidas rápidas', 'Ensaladas', 'Sopas y caldos', 'Picadas', 'Salsas',
              'Panadería', 'Repostería', 'Postres', 'Veganas', 'Vegetarianas', 'Sin TACC',
              'Bajas en carbohidratos', 'Fitness']}
            ingredientesDisponibles={['Carne', 'Lechuga', 'Aceite', 'Queso', 'Jamón', 'Cebolla']}
            selectedTipos={tiposSeleccionados}
            onResetTipos={resetTipos}
            usuarioFiltro={usuarioFiltro}
            setUsuarioFiltro={setUsuarioFiltro}
            onResetUsuarios={resetUsuarios}
            setIngredientesSeleccionados={setIngredientesSeleccionados}
            onResetIngredientes={resetIngredientes}
            ingredientesExcluidos={ingredientesExcluidos}
            setIngredientesExcluidos={setIngredientesExcluidos}
            onResetIngredientesExcluidos={resetIngredientesExcluidos}
          />
        </View>

        {!hayBusquedaOFiltro && (
          <>
            <ImageCarousel data={imagenes} />
            <LatestRecipesPreview
              recipes={latestRecipes}
              onPressRecipe={(receta) => navigation.navigate('DetailRecipeScreen', { id: receta.id })}
            />
            <HorizontalCards
              title="Explorá nuevas recetas"
              data={allRecipes}
              onItemPress={(receta) => navigation.navigate('DetailRecipeScreen', { id: receta.id })}
            />
            <HorizontalCards
              title="Explorá cursos"
              data={courses}
              onItemPress={(course) => navigation.navigate('DetailCourseScreen', { course })}
            />
          </>
        )}

        {hayBusquedaOFiltro && (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {recetasFiltradas.map((item) => (
              <RecipeOrCourseCard
                key={item.id}
                title={item.title}
                image={{ uri: item.mainPhoto }}
                rating={item.rating}
                reviews={item.reviews}
                level={item.experienceLevel}
                userImage={{ uri: item.authorImage }}
                userName={item.authorName}
                userAlias={item.authorAlias}
                onPress={() => navigation.navigate('DetailRecipeScreen', { id: item.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <BottomTabs activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {},
});
