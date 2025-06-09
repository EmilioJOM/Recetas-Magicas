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
import { getLatestRecipes } from '../api/auth';

/**
const [latestRecipes, setLatestRecipes] = useState([]);

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
*/
const recetasMock = [
  { id: '1', title: 'Tarta de Verdura', isFavorite: true, isModified: false, isInCourse: false },
  { id: '2', title: 'Pollo a la Mostaza', isFavorite: false, isModified: true, isInCourse: true },
  { id: '3', title: 'Milanesa con Puré', isFavorite: true, isModified: true, isInCourse: false },
];

const ultimasRecetas = [
  { id: '1', title: 'Lasagna', image: require('../assets/Pancho.jpg') },
  { id: '2', title: 'Plato de Fideos', image: require('../assets/Fideos3.jpg') },
  { id: '3', title: 'Shawarma', image: require('../assets/Shawarma.jpg') },
  { id: '4', title: 'Ensalada Mixta', image: require('../assets/Rabioles.jpg') },
  { id: '5', title: 'Postre Casero', image: require('../assets/burguer.jpg') },
];

const imagenes = [
  { id: '1', image: require('../assets/Shawarma.jpg'), title: 'Curso de Cocina Árabe' },
  { id: '2', image: require('../assets/pizza1.jpg'), title: 'Curso de Pizzas' },
  { id: '3', image: require('../assets/Costilla.jpg'), title: 'Curso de Parrilla' },
  { id: '4', image: require('../assets/burguer.jpg'), title: 'Curso de Hamburguesas' },
  { id: '5', image: require('../assets/platoDeFideos.jpg'), title: 'Curso de Pastas' },
];

const exploraRecetas = [
  {
    id: '1',
    image: require('../assets/Lasagna.jpg'),
    title: 'Curso de Cocina Árabe',
    rating: 4.8,
    reviews: 500,
    level: 'Intermedio',
    desc: 'Un curso ideal para aprender los secretos de la cocina árabe tradicional.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Sofía González',
    userAlias: '@sofigon',
    ingredientes: [
      { nombre: 'Queso', cantidad: 200, unidad: 'g' },
      { nombre: 'Cebolla', cantidad: 1, unidad: 'unidad' },
      { nombre: 'Papines', cantidad: 400, unidad: 'gr' },
      { nombre: 'Sal, pimienta, aji molido, pimenton', cantidad: '', unidad: 'c/n ' },
      { nombre: 'Filet de merluza sin espinas', cantidad: 1, unidad: 'kilo' },
      { nombre: 'Carne picada', cantidad: 1, unidad: 'kilo' },
    ],
    pasos: [
      {
        texto: 'Cortar la cebolla en juliana.',
        imagenes: [
          require('../assets/CortarCebolla.jpg'),
          require('../assets/CortarTomate.jpg')
        ],
      },
      {
        texto: 'Rallar el queso.',
        imagenes: [],
      },
      {
        texto: 'Saltear la cebolla y agregarla a la mezcla.',
        imagenes: [],
      },
      {
        texto: 'Hornear hasta dorar.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: false,
    isInCourse: false,
    tipo: 'Pastas',
    ago: 'hace 3 días',
  },
  {
    id: '2',
    image: require('../assets/pizza2.jpg'),
    title: 'Curso de Pizzas',
    rating: 4.6,
    reviews: 320,
    level: 'Principiante',
    desc: 'Aprendé a preparar las mejores pizzas desde cero.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Carlos Fernández',
    userAlias: '@carlosf',
    ingredientes: [
      { nombre: 'Harina', cantidad: 500, unidad: 'g' },
      { nombre: 'Salsa de tomate', cantidad: 200, unidad: 'ml' },
      { nombre: 'Mozzarella', cantidad: 300, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Mezclar la harina con agua y sal para hacer la masa.',
        imagenes: [],
      },
      {
        texto: 'Dejar leudar durante 1 hora.',
        imagenes: [],
      },
      {
        texto: 'Extender la masa, agregar salsa y mozzarella.',
        imagenes: [],
      },
      {
        texto: 'Hornear por 15 minutos a 220°C.',
        imagenes: [],
      },
    ],
    isFavorite: false,
    isModified: false,
    isInCourse: true,
    tipo: 'Pizzas',
    ago: 'hace 1 semana',
  },
  {
    id: '3',
    image: require('../assets/Papas.jpg'),
    title: 'Curso de Parrilla',
    rating: 4.9,
    reviews: 890,
    level: 'Avanzado',
    desc: 'Convertite en un maestro parrillero con este curso completo.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'María López',
    userAlias: '@marial',
    ingredientes: [
      { nombre: 'Carne', cantidad: 1, unidad: 'kg' },
      { nombre: 'Sal gruesa', cantidad: 50, unidad: 'g' },
      { nombre: 'Carbón', cantidad: 1, unidad: 'bolsa' },
    ],
    pasos: [
      {
        texto: 'Encender el fuego con carbón y dejar formar brasas.',
        imagenes: [],
      },
      {
        texto: 'Salpimentar la carne.',
        imagenes: [],
      },
      {
        texto: 'Colocar sobre la parrilla caliente.',
        imagenes: [],
      },
      {
        texto: 'Cocinar según el punto deseado, girando una sola vez.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: true,
    isInCourse: false,
    tipo: 'Carnes',
    ago: 'hace 5 días',
  },
  {
    id: '4',
    image: require('../assets/burguer.jpg'),
    title: 'Curso de Hamburguesas',
    rating: 4.7,
    reviews: 410,
    level: 'Intermedio',
    desc: 'Todo lo que necesitás saber para hacer hamburguesas increíbles.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Lucas Méndez',
    userAlias: '@lucasm',
    ingredientes: [
      { nombre: 'Carne picada', cantidad: 500, unidad: 'g' },
      { nombre: 'Pan', cantidad: 4, unidad: 'unidades' },
      { nombre: 'Queso cheddar', cantidad: 200, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Formar las hamburguesas con la carne picada.',
        imagenes: [],
      },
      {
        texto: 'Cocinar en plancha o parrilla hasta dorar.',
        imagenes: [],
      },
      {
        texto: 'Agregar queso cheddar para que se derrita.',
        imagenes: [],
      },
      {
        texto: 'Servir en pan con los toppings deseados.',
        imagenes: [],
      },
    ],
    isFavorite: false,
    isModified: false,
    isInCourse: true,
    tipo: 'Hamburguesas',
    ago: 'hace 2 semanas',
  },
  {
    id: '5',
    image: require('../assets/Cheeseburger.jpg'),
    title: 'Curso de Pastas',
    rating: 4.5,
    reviews: 270,
    level: 'Principiante',
    desc: 'Desde ravioles hasta lasagna, dominá el mundo de las pastas.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Ana Torres',
    userAlias: '@anato',
    ingredientes: [
      { nombre: 'Harina', cantidad: 400, unidad: 'g' },
      { nombre: 'Huevos', cantidad: 3, unidad: 'unidades' },
      { nombre: 'Queso ricotta', cantidad: 250, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Formar la masa con harina y huevos.',
        imagenes: [],
      },
      {
        texto: 'Estirar la masa y cortar en forma de ravioles.',
        imagenes: [],
      },
      {
        texto: 'Rellenar con ricotta y cerrar los ravioles.',
        imagenes: [],
      },
      {
        texto: 'Hervir durante 5 minutos y servir con salsa.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: true,
    isInCourse: false,
    tipo: 'Pastas',
    ago: 'hace 10 días',
  },
];


const recetasBuscador = [
  {
    id: '1',
    image: require('../assets/Lasagna.jpg'),
    title: 'Curso de Cocina Árabe',
    rating: 4.8,
    reviews: 500,
    level: 'Intermedio',
    desc: 'Un curso ideal para aprender los secretos de la cocina árabe tradicional.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Sofía González',
    userAlias: '@sofigon',
    ingredientes: [
      { nombre: 'Queso', cantidad: 200, unidad: 'g' },
      { nombre: 'Cebolla', cantidad: 1, unidad: 'unidad' },
    ],
    pasos: [
      {
        texto: 'Cortar la cebolla en juliana.',
        imagenes: [
          require('../assets/CortarCebolla.jpg'),
          require('../assets/CortarTomate.jpg')
        ],
      },
      {
        texto: 'Rallar el queso.',
        imagenes: [],
      },
      {
        texto: 'Saltear la cebolla y agregarla a la mezcla.',
        imagenes: [],
      },
      {
        texto: 'Hornear hasta dorar.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: false,
    isInCourse: false,
    tipo: 'Pastas',
    ago: 'hace 3 días',
  },
  {
    id: '2',
    image: require('../assets/pizza2.jpg'),
    title: 'Curso de Pizzas',
    rating: 4.6,
    reviews: 320,
    level: 'Principiante',
    desc: 'Aprendé a preparar las mejores pizzas desde cero.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Carlos Fernández',
    userAlias: '@carlosf',
    ingredientes: [
      { nombre: 'Harina', cantidad: 500, unidad: 'g' },
      { nombre: 'Salsa de tomate', cantidad: 200, unidad: 'ml' },
      { nombre: 'Mozzarella', cantidad: 300, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Mezclar la harina con agua y sal para hacer la masa.',
        imagenes: [],
      },
      {
        texto: 'Dejar leudar durante 1 hora.',
        imagenes: [],
      },
      {
        texto: 'Extender la masa, agregar salsa y mozzarella.',
        imagenes: [],
      },
      {
        texto: 'Hornear por 15 minutos a 220°C.',
        imagenes: [],
      },
    ],
    isFavorite: false,
    isModified: false,
    isInCourse: true,
    tipo: 'Pizzas',
    ago: 'hace 1 semana',
  },
  {
    id: '3',
    image: require('../assets/Papas.jpg'),
    title: 'Curso de Parrilla',
    rating: 4.9,
    reviews: 890,
    level: 'Avanzado',
    desc: 'Convertite en un maestro parrillero con este curso completo.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'María López',
    userAlias: '@marial',
    ingredientes: [
      { nombre: 'Carne', cantidad: 1, unidad: 'kg' },
      { nombre: 'Sal gruesa', cantidad: 50, unidad: 'g' },
      { nombre: 'Carbón', cantidad: 1, unidad: 'bolsa' },
    ],
    pasos: [
      {
        texto: 'Encender el fuego con carbón y dejar formar brasas.',
        imagenes: [],
      },
      {
        texto: 'Salpimentar la carne.',
        imagenes: [],
      },
      {
        texto: 'Colocar sobre la parrilla caliente.',
        imagenes: [],
      },
      {
        texto: 'Cocinar según el punto deseado, girando una sola vez.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: true,
    isInCourse: false,
    tipo: 'Carnes',
    ago: 'hace 5 días',
  },
  {
    id: '4',
    image: require('../assets/burguer.jpg'),
    title: 'Curso de Hamburguesas',
    rating: 4.7,
    reviews: 410,
    level: 'Intermedio',
    desc: 'Todo lo que necesitás saber para hacer hamburguesas increíbles.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Lucas Méndez',
    userAlias: '@lucasm',
    ingredientes: [
      { nombre: 'Carne picada', cantidad: 500, unidad: 'g' },
      { nombre: 'Pan', cantidad: 4, unidad: 'unidades' },
      { nombre: 'Queso cheddar', cantidad: 200, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Formar las hamburguesas con la carne picada.',
        imagenes: [],
      },
      {
        texto: 'Cocinar en plancha o parrilla hasta dorar.',
        imagenes: [],
      },
      {
        texto: 'Agregar queso cheddar para que se derrita.',
        imagenes: [],
      },
      {
        texto: 'Servir en pan con los toppings deseados.',
        imagenes: [],
      },
    ],
    isFavorite: false,
    isModified: false,
    isInCourse: true,
    tipo: 'Hamburguesas',
    ago: 'hace 2 semanas',
  },
  {
    id: '5',
    image: require('../assets/Cheeseburger.jpg'),
    title: 'Curso de Pastas',
    rating: 4.5,
    reviews: 270,
    level: 'Principiante',
    desc: 'Desde ravioles hasta lasagna, dominá el mundo de las pastas.',
    userImage: require('../assets/FotoPerfil5.jpg'),
    userName: 'Ana Torres',
    userAlias: '@anato',
    ingredientes: [
      { nombre: 'Harina', cantidad: 400, unidad: 'g' },
      { nombre: 'Huevos', cantidad: 3, unidad: 'unidades' },
      { nombre: 'Queso ricotta', cantidad: 250, unidad: 'g' },
    ],
    pasos: [
      {
        texto: 'Formar la masa con harina y huevos.',
        imagenes: [],
      },
      {
        texto: 'Estirar la masa y cortar en forma de ravioles.',
        imagenes: [],
      },
      {
        texto: 'Rellenar con ricotta y cerrar los ravioles.',
        imagenes: [],
      },
      {
        texto: 'Hervir durante 5 minutos y servir con salsa.',
        imagenes: [],
      },
    ],
    isFavorite: true,
    isModified: true,
    isInCourse: false,
    tipo: 'Pastas',
    ago: 'hace 10 días',
  },
];




export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [usuarioFiltro, setUsuarioFiltro] = useState('');
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);

  const filtros = ['Todos', 'Favoritos', 'Modificadas', 'Mis Cursos', 'Tipo', 'Usuario', 'Ingrediente'];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Cuando cambia el filtro o el texto de búsqueda, si el filtro seleccionado es 'Todos' pero hay búsqueda o filtro distinto, desactivo 'Todos'
  useEffect(() => {
    const hayFiltrosSecundarios = tiposSeleccionados.length > 0 || usuarioFiltro.trim().length > 0;

    if ((searchText.length > 0 || hayFiltrosSecundarios) && selectedFilter === 'Todos') {
      setSelectedFilter('');
    }
  }, [searchText, tiposSeleccionados, usuarioFiltro]);

  // Cuando cambia el filtro, si no es 'Tipo', limpio tipos seleccionados
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter !== 'Tipo') {
      setTiposSeleccionados([]);
    }


    if (filter === 'Todos' || filter === 'Mis Cursos') {
      setUsuarioFiltro('');
      setIngredientesSeleccionados([]);
    }
  };


  const recetasFiltradas = recetasBuscador.filter((r) => {
    const matchBusqueda = r.title.toLowerCase().includes(searchText.toLowerCase());

    let matchFiltroPrincipal = true;

    const esTodos = selectedFilter === 'Todos' || selectedFilter === '';
    const esMisCursos = selectedFilter === 'Mis Cursos';

    // Filtro principal
    switch (selectedFilter) {
      case 'Favoritos':
        matchFiltroPrincipal = r.isFavorite;
        break;
      case 'Modificadas':
        matchFiltroPrincipal = r.isModified;
        break;
      case 'Mis Cursos':
        matchFiltroPrincipal = r.isInCourse;
        break;
      case 'Todos':
      case '':
        matchFiltroPrincipal = true;
        break;
      default:
        matchFiltroPrincipal = true;
    }

    // Si 'Todos' o 'Mis Cursos' están activos, ignoramos tipo/usuario
    const desactivarSecundarios = esTodos || esMisCursos;

    // Filtro tipo
    const matchTipo = desactivarSecundarios
      ? true
      : tiposSeleccionados.length === 0
        ? true
        : tiposSeleccionados.includes(r.tipo);

    // Filtro usuario
    const matchUsuario = desactivarSecundarios
      ? true
      : usuarioFiltro.trim() === ''
        ? true
        : (r.userAlias || '').toLowerCase().includes(usuarioFiltro.toLowerCase());

    // Filtro ingrediente
    const matchIngredientes = desactivarSecundarios
      ? true
      : ingredientesSeleccionados.length === 0
        ? true
        : r.ingredientes?.some(ing => ingredientesSeleccionados.includes(ing));


    return matchBusqueda && matchFiltroPrincipal && matchTipo && matchUsuario && matchIngredientes;
  });





  // Si hay búsqueda o filtro distinto de 'Todos' activo
  const hayBusquedaOFiltro =
    searchText.length > 0 || (selectedFilter !== 'Todos' && selectedFilter !== '');

  const resetTipos = () => {
    setTiposSeleccionados([]);
  };

  const resetUsuarios = () => {
    setUsuarioFiltro('');
  };

  const resetIngredientes = () => {
    setIngredientesSeleccionados([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 50 },
        ]}
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
              'Pastas',
              'Comidas rápidas',
              'Ensaladas',
              'Sopas y caldos',
              'Picadas',
              'Salsas',
              'Panadería',
              'Repostería',
              'Postres',
              'Veganas',
              'Vegetarianas',
              'Sin TACC',
              'Bajas en carbohidratos',
              'Fitness',
            ]}
            ingredientesDisponibles={[
              'Carne',
              'Lechuga',
              'Aceite',
              'Queso',
              'Jamón',
              'Cebolla',
            ]}
            selectedTipos={tiposSeleccionados}
            onResetTipos={resetTipos}

            usuarioFiltro={usuarioFiltro}
            setUsuarioFiltro={setUsuarioFiltro}
            onResetUsuarios={resetUsuarios}

            setIngredientesSeleccionados={setIngredientesSeleccionados}
            onResetIngredientes={resetIngredientes}
          />
        </View>

        {!hayBusquedaOFiltro && (
          <>
            <ImageCarousel data={imagenes} />
            <LatestRecipesPreview
              recipes={latestRecipes}
              onPressRecipe={(receta) =>
                navigation.navigate('DetailRecipeScreen', { receta })
              }
            />
            <HorizontalCards
              title="Explorá nuevas recetas"
              data={exploraRecetas}
              onItemPress={(receta) =>
                navigation.navigate('DetailRecipeScreen', { receta })
              }
            />
            <HorizontalCards
              title="Explorá cursos"
              data={exploraRecetas}
              onItemPress={(curso) =>
                navigation.navigate('CursoDetalle', { curso })
              }
            />
          </>
        )}

        {hayBusquedaOFiltro && (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {recetasFiltradas.map((item) => (
              <RecipeOrCourseCard
                key={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                reviews={item.reviews}
                level={item.level}
                userImage={item.userImage}
                userName={item.userName}
                userAlias={item.userAlias}
                onPress={() => navigation.navigate('DetailRecipeScreen', { receta: item })}
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
