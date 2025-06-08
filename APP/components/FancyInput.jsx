// FancyInput.jsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function FancyInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  style,
  keyboardType,
  maxLength
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      style={[styles.fancyInput, style]}  // <-- acá va fancyInput
      autoCapitalize="none"
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  fancyInput: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30, // redondeado total
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // para Android sombra
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
