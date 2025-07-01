// screens/OnlyStudentsScreen.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import PermissionPrompt from '../components/PermissionPrompt';
import { useNavigation } from '@react-navigation/native';

export default function OnlyStudentsScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <PermissionPrompt
        title="Solo Alumnos pueden inscribirse a cursos"
        imageSource={require('../assets/lock.png')}
        buttons={[
          { label: 'Registrarse como Alumno', onPress: () => navigation.navigate('BecomeStudentScreen') },
          { label: 'Seguir como usuario', onPress: () => navigation.navigate('HomeScreen') },
        ]}
      />
    </ScrollView>
  );
}
