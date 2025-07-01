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
        imageSource={require('../assets/lock.png')}
        buttons={[
          { label: 'Registrarse', onPress: () => navigation.navigate('RegisterScreen') },
          { label: 'Iniciar Sesion', onPress: () => navigation.navigate('LoginScreen') },
          { label: 'Seguir como visitante', onPress: () => navigation.navigate('HomeScreen') },
        ]}
      />
    </ScrollView>
  );
}

