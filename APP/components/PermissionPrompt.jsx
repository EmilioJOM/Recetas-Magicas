// components/PermissionPrompt.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function PermissionPrompt({
  title,
  imageSource,
  buttons = [],
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.buttonContainer}>
        {buttons.map(({ label, onPress }, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    color: '#111',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#f58220',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
