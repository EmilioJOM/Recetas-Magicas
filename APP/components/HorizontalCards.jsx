import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HorizontalCards({ title, data, onItemPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onItemPress(item)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

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
