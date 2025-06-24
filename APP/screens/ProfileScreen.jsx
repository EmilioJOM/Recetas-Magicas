import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', style: 'destructive', onPress: () => logout(navigation) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Image
            source={require('../assets/FotoPerfil1.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.alias}>{user?.alias || 'Usuario'}</Text>
          <Text style={styles.email}>{user?.email || 'email@ejemplo.com'}</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>¡Completá tu perfil!</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} /> 
          </View>
        </View>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Ver información personal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Ver medio de pago</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Información legal</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <BottomTabs activeTab="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: 80, // espacio para el BottomTabs
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  alias: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FA8C1E',
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FA8C1E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
