import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

export default function ImageCarousel({ data, horizontalPadding = 16 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselWidth = screenWidth - horizontalPadding * 2;

  return (
    <View style={{ ...styles.container, paddingHorizontal: horizontalPadding }}>
      <Carousel
        loop
        width={carouselWidth}
        height={180}
        autoPlay
        scrollAnimationDuration={1000}
        data={data}
        onSnapToItem={setCurrentIndex}
        mode="default" // 👈 esto desactiva el parallax
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />

            {/* Título y subtítulo */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
            </View>

            {/* Indicadores */}
            <View style={styles.dotsContainer}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  item: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 4,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E08D3E',
  },
});
