import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HorizontalCards({ title, data, onItemPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={Array.isArray(data) ? data : []}
        horizontal
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const image = item.mainPhoto || item.image || 'https://via.placeholder.com/140';

          return (
            <TouchableOpacity style={styles.card} onPress={() => onItemPress(item)}>
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.title} numberOfLines={1}>{item.title || 'Sin título'}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

HorizontalCards.defaultProps = {
  data: [],
  onItemPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  card: {
    width: 140,
    marginRight: 12,
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});
