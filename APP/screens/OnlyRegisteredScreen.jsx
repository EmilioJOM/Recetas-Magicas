// screens/OnlyRegisteredScreen.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import PermissionPrompt from '../components/PermissionPrompt';
import { useNavigation } from '@react-navigation/native';

export default function OnlyRegisteredScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PermissionPrompt
        title="Acceso solo para usuarios registrados"
        imageSource={require('../assets/LogoSinFondo.png')}
        buttons={[
          { label: 'Registrarse', onPress: () => navigation.navigate('RegisterStepOneScreen') },
          { label: 'Iniciar Sesion', onPress: () => navigation.navigate('TestLoginScreen') },
          { label: 'Seguir como visitante', onPress: () => navigation.navigate('HomeScreen') },
        ]}
      />
    </ScrollView>
  );
}

