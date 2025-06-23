import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

function Bubble({ delay, size, xPosition, initialY }) {
  const translateY = useSharedValue(initialY);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-50, { duration: 3500 + Math.random() * 3000, easing: Easing.linear }),
        -1,
        false
      )
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0, { duration: 3500 + Math.random() * 3000, easing: Easing.linear }),
        -1,
        false
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.bubble,
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: xPosition,
          top: 0,
          backgroundColor: 'rgba(255, 200, 100, 0.3)',
          position: 'absolute',
        },
      ]}
    />
  );
}

export default function SplashScreen({ navigation }) {
  const scale = useSharedValue(0);
  const recetasOpacity = useSharedValue(0);
  const magicasOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });

    recetasOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
    magicasOpacity.value = withDelay(1600, withTiming(1, { duration: 600 }));
    subtitleOpacity.value = withDelay(2200, withTiming(1, { duration: 800 }));

    /** 
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 3600);

    return () => clearTimeout(timer);
    */
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRecetasStyle = useAnimatedStyle(() => ({
    opacity: recetasOpacity.value,
  }));

  const animatedMagicasStyle = useAnimatedStyle(() => ({
    opacity: magicasOpacity.value,
  }));

  const animatedSubtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  // Ahora burbujas por toda la pantalla con random X y posición inicial Y (de abajo)
  const bubbles = Array.from({ length: 40 }).map((_, i) => {
    const size = 8 + Math.random() * 18; // tamaños variados
    const xPosition = Math.random() * (width - size);
    const initialY = height + Math.random() * 100; // empiezan por debajo de la pantalla
    const delay = Math.random() * 4000;

    return (
      <Bubble
        key={i}
        size={size}
        xPosition={xPosition}
        delay={delay}
        initialY={initialY}
      />
    );
  });

  return (
    <View style={styles.container}>
      {bubbles}

      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Image
          source={require('../assets/LogoSinFondo.png')}
          style={styles.logoImage}
        />
      </Animated.View>

      <Animated.Text style={[styles.recetasText, animatedRecetasStyle]}>
        Recetas
      </Animated.Text>

      <Animated.Text style={[styles.magicasText, animatedMagicasStyle]}>
        Mágicas
      </Animated.Text>

      <Animated.Text style={[styles.subtitleText, animatedSubtitleStyle]}>
        Descubre la magia de tu cocina
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8816',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 200, 100, 0.3)',
  },
  logoContainer: {
    marginBottom: 30,
    shadowColor: '#FA8C1E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  recetasText: {
    fontSize: 48,
    color: 'white',
    fontWeight: '900',
    letterSpacing: 3,
  },
  magicasText: {
    fontSize: 48,
    color: 'white',
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 15,
  },
  subtitleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 1,
  },
});