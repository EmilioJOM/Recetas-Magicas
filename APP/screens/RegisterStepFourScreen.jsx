import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import Input from '../components/Input';
import Button from '../components/Button';
import { userDni } from '../api/auth';
import { useAuth } from '../context/AuthContext';

// Validación
const schema = yup.object().shape({
  dni: yup
    .string()
    .matches(/^\d{7,8}$/, 'Debe tener 7 u 8 dígitos')
    .required('El DNI es obligatorio'),

  dniTramite: yup
    .string()
    .matches(/^\d{10}$/, 'Debe tener 10 dígitos')
    .required('El número de trámite es obligatorio'),
});

export default function RegisterStepFourScreen() {
  const navigation = useNavigation();
  const [dniFront, setDniFront] = useState(null);
  const [dniBack, setDniBack] = useState(null);
  const [imageError, setImageError] = useState(''); // <-- Estado para error en fotos

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const pickImage = async (setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageError(''); // limpio error si cargo una imagen
    }
  };

  const onSubmit = async (data) => {
    if (!dniFront || !dniBack) {
      setImageError('Por favor, subí las dos fotos del DNI.');
      return;
    }
    //navigation.navigate('RegisterStepFiveScreen');
    setImageError('');
    const { token } = useAuth();
    try {
      // Crear un FormData para enviar archivos
      const formData = new FormData();
      formData.append('dni', data.dni);
      formData.append('dniTramite', data.dniTramite);

      formData.append('dniFront', {
        uri: dniFront,
        name: 'dniFront.jpg',
        type: 'image/jpeg',
      });

      formData.append('dniBack', {
        uri: dniBack,
        name: 'dniBack.jpg',
        type: 'image/jpeg',
      });

      await userDni(formData, { token }); // llamada al backend

      // Si todo sale bien
      navigation.navigate('RegisterStepFiveScreen');
    } catch (error) {
      console.error('Error al enviar datos del DNI:', error);
      setImageError('Hubo un error al enviar los datos. Intentalo nuevamente.');
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Verificación de identidad</Text>
        <Text style={styles.subtitle}>Ingresá tus datos personales</Text>

        {/* DNI */}
        <Controller
          control={control}
          name="dni"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="DNI"
              keyboardType="numeric"
              value={value}
              maxLength={8}
              onChangeText={onChange}
            />
          )}
        />
        {errors.dni && <Text style={styles.error}>{errors.dni.message}</Text>}

        {/* Número de trámite */}
        <Controller
          control={control}
          name="dniTramite"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Número de trámite"
              keyboardType="numeric"
              value={value}
              maxLength={10}
              onChangeText={onChange}
            />
          )}
        />
        {errors.dniTramite && (
          <Text style={styles.error}>{errors.dniTramite.message}</Text>
        )}

        {/* Foto frente */}
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage(setDniFront)}
        >
          <Text style={styles.imagePickerText}>Subir foto del frente del DNI</Text>
          {dniFront && <Image source={{ uri: dniFront }} style={styles.preview} />}
        </TouchableOpacity>

        {/* Foto dorso */}
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage(setDniBack)}
        >
          <Text style={styles.imagePickerText}>Subir foto del dorso del DNI</Text>
          {dniBack && <Image source={{ uri: dniBack }} style={styles.preview} />}
        </TouchableOpacity>

        {/* Mensaje de error para fotos */}
        {!!imageError && <Text style={styles.imageError}>{imageError}</Text>}

        <Button title="Continuar" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E08D3E',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  error: {
    color: '#f00',
    fontSize: 14,
  },
  imageError: {
    color: '#f00',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#555',
  },
  preview: {
    width: 200,
    height: 120,
    marginTop: 8,
    borderRadius: 6,
  },
});
