// Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({
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
      style={[styles.input, style]}
      autoCapitalize="none"
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
  },
});
