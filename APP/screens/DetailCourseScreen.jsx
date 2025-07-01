import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomTabs from '../components/BottomTabs';
import { getCourseById } from '../api/auth';

const windowWidth = Dimensions.get('window').width;

export default function DetailCourseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { course: passedCourse } = route.params || {};

  const [course, setCourse] = useState(passedCourse || null);
  const [loading, setLoading] = useState(!passedCourse);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!passedCourse?.id) return;
      try {
        const response = await getCourseById(passedCourse.id);
        setCourse(response.data);
      } catch (error) {
        console.error('Error al obtener el curso:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  if (loading || !course) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#E08D3E" />
      </View>
    );
  }

  const {
    title,
    description,
    main_photo,
    contenidos = [],
    requirements,
    duration,
    price,
    modality,
  } = course;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagen destacada */}
        <Image
          source={main_photo ? { uri: main_photo } : require('../assets/pizza2.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Contenido */}
        <View style={styles.contentWrapper}>
          {/* Título */}
          <Text style={styles.title}>
            {title || 'Programa de pastelería experto profesional'}
          </Text>

          {/* Descripción */}
          <Text style={styles.description}>
            {description ||
              'El objetivo es formar profesionales que no solo trabajen operativamente sino que además tengan las herramientas para diseñar, implementar y supervisar, tanto empresas como procesos culinarios y servicios gastronómicos de alto nivel.'}
          </Text>

          {/* Info del curso */}
          <View style={styles.card}>
            <Text style={styles.infoItem}>⭐ 4.8 · <Text style={styles.infoSub}>183 reseñas</Text></Text>
            <Text style={styles.infoItem}>🎓 Nivel: <Text style={styles.infoSub}>Intermedio</Text></Text>
            <Text style={styles.infoItem}>🕒 Duración: <Text style={styles.infoSub}>{duration || '3 meses'}</Text></Text>
            <Text style={styles.infoItem}>🗣️ Idioma: <Text style={styles.infoSub}>Español</Text></Text>
            <Text style={styles.infoItem}>📅 Modalidad: <Text style={styles.infoSub}>{modality || '14 de abril'}</Text></Text>
          </View>

          {/* Aprendizajes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>¿Qué aprenderás?</Text>
            <View style={styles.bulletContainer}>
              {contenidos.length > 0 ? (
                contenidos.map((item, index) => (
                  <Text key={index} style={styles.bullet}>• {item}</Text>
                ))
              ) : (
                <>
                  <Text style={styles.bullet}>• Planificar y estructurar negocios culinarios.</Text>
                  <Text style={styles.bullet}>• Liderar equipos y garantizar la calidad del servicio.</Text>
                  <Text style={styles.bullet}>• Aplicar técnicas avanzadas de cocina e innovación profesional.</Text>
                </>
              )}
            </View>
          </View>

          {/* Cronograma */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Cronograma del curso</Text>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Semana 1: Introducción y bases de la pastelería</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Semana 2: Técnicas de masas y fermentaciones</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Semana 3: Postres clásicos y emplatado</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Semana 4: Proyecto final y evaluación</Text>
            </View>
          </View>

          {/* Elementos necesarios */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Elementos necesarios</Text>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Utensilios básicos de pastelería (batidora, moldes, espátulas)</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Ingredientes frescos y de calidad</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Recetas y manuales proporcionados en el curso</Text>
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <Text style={styles.timelineText}>Acceso a videos y material complementario online</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Botón de inscripción */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SelectSedeScreen', { courseId: course.id })} // <- ACA el navigate
        >
          <Text style={styles.buttonText}>✨ Inscribite ahora — ¡Cupos limitados!</Text>
        </TouchableOpacity>
      </View>

      {/* Menú inferior */}
      <BottomTabs activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    paddingBottom: 160,
  },
  heroImage: {
    width: windowWidth,
    height: 220,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  infoItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  infoSub: {
    fontWeight: '600',
    color: '#555',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  bulletContainer: {
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E08D3E',
    marginRight: 10,
  },
  timelineText: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#E08D3E',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
