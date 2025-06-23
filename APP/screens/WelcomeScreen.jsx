import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=crop&w=1000&h=1500&q=80',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Recetas Mágicas</Text>
          <Text style={styles.subtitle}>Cociná. Compartí. Sorprendé.</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('RegisterStepOneScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Registrarte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('TestLoginScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.navigate('HomeScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.guestButtonText}>Entrar como Invitado</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 46,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 90,
    borderRadius: 35,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 90,
    borderRadius: 35,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WelcomeScreen;
