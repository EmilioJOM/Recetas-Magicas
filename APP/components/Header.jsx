import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 16, backgroundColor: '#FA8C1E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
          <Ionicons name="arrow-back" size={24} color="black"/>
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
}
