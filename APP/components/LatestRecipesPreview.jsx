import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default function LatestRecipesPreview({ recipes = [], onPressRecipe }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Últimas Recetas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recipes.slice(0, 5).map((recipe) => (
          <RecipeItem
            key={recipe.id}
            title={recipe.title}
            image={recipe.mainPhoto}
            onPress={() => onPressRecipe?.(recipe)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function RecipeItem({ title, image, onPress }) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.image}
        />

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
