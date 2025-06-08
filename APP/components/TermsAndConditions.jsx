// TermsAndConditions.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TermsAndConditions() {
  const navigation = useNavigation();

  return (
    <Text style={styles.containerText}>
      Al continuar, aceptás nuestros{' '}
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('TermsOfServiceScreen')}
      >
        Términos de Servicio
      </Text>{' '}
      y{' '}
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('PrivacyPolicyScreen')}
      >
        Política de Privacidad
      </Text>.
    </Text>
  );
}

const styles = StyleSheet.create({
  containerText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#828282',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#000000',
    fontWeight: '600', // mejor poner un número que 'medium' para compatibilidad
  },
});
