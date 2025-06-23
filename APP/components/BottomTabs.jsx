import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function BottomTabs({ activeTab }) {
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    navigation.navigate(tab); // El nombre de la screen debe coincidir con el tab
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTabPress('HomeScreen')} style={styles.tabButton}>
        <Icon
          name="home"
          size={28}
          color={activeTab === 'Home' ? '#E08D3E' : '#000000'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('CreateRecipeStepOneScreen')} style={styles.tabButton}>
        <Icon
          name="plus-box"
          size={28}
          color={activeTab === 'AddRecipe' ? '#E08D3E' : '#000000'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('QRScanner')} style={styles.tabButton}>
        <Icon
          name="qrcode-scan"
          size={28}
          color={activeTab === 'QRScanner' ? '#E08D3E' : '#000000'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('Notifications')} style={styles.tabButton}>
        <Icon
          name="bell"
          size={28}
          color={activeTab === 'Notifications' ? '#E08D3E' : '#000000'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTabPress('ProfileScreen')} style={styles.tabButton}>
        <Icon
          name="account"
          size={28}
          color={activeTab === 'Profile' ? '#E08D3E' : '#000000'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    bottom: 8
  },
});
