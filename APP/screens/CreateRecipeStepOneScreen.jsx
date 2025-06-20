import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from '../components/BottomTabs';
import * as Yup from 'yup';

const CreateRecipeStepOneScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const experienceOptions = ['Principiante', 'Intermedio', 'Experto'];

  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('El nombre de la receta es obligatorio.'),
    description: Yup.string()
      .trim()
      .required('La descripción de la receta es obligatoria.'),
    experience: Yup.string()
      .oneOf(experienceOptions, 'Selecciona un nivel válido de experiencia.')
      .required('Debés seleccionar un nivel de experiencia.'),
    image: Yup.string()
      .nullable()
      .required('Debés subir una imagen de la receta.')
      .test(
        'is-valid-image',
        'Debés subir una imagen válida.',
        (value) => !!value && value.trim() !== ''
      ),
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos permiso para acceder a tu galería de fotos.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Funciona aunque tire warn
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const validateAndContinue = async () => {
    try {
      await schema.validate(
        {
          name,
          description,
          experience,
          image,
        },
        { abortEarly: false }
      );

      setErrors({});

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('experience', experience);
      formData.append('image', {
        uri: image,
        name: 'recipe-image.jpg',
        type: 'image/jpeg',
      });

      // 🚀 Simula envío o reemplaza con tu fetch real
      Alert.alert('Validación exitosa', 'La receta está lista para enviar.');

      navigation.navigate('CreateRecipeStepTwoScreen');

    } catch (validationError) {
      if (validationError.name === 'ValidationError') {
        const newErrors = {};
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error(validationError);
        Alert.alert('Error', validationError.message || 'Error desconocido');
      }
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 130 }}>
      <View style={styles.progressContainer}>
        <View style={[styles.step, styles.stepActive]} />
        <View style={styles.step} />
        <View style={styles.step} />
      </View>

      <Text style={styles.title}>Crear Receta</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nombre de la receta"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Descripción breve</Text>
      <TextInput
        style={[styles.input, { height: 80 }, errors.description && styles.inputError]}
        placeholder="Breve descripción de la receta"
        value={description}
        multiline
        onChangeText={setDescription}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text style={styles.label}>Experiencia recomendada</Text>
      <View style={styles.dropdownContainer}>
        {experienceOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.experienceOption,
              experience === option && styles.experienceOptionSelected,
            ]}
            onPress={() => setExperience(option)}
          >
            <Text style={{ color: experience === option ? '#fff' : '#333' }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.experience && <Text style={styles.errorText}>{errors.experience}</Text>}

      <Text style={styles.label}>Imagen principal</Text>
      <TouchableOpacity
        style={[
          styles.imageUpload,
          errors.image && { borderColor: '#FF5C5C' },
        ]}
        onPress={pickImage}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="cloud-upload-outline" size={36} color="#999" />
            <Text style={styles.uploadText}>Seleccionar o arrastrar los archivos aquí</Text>
            <Text style={styles.imageHint}>
              Sube tu imagen JPG, JPEG, PNG o WEBP, con una resolución mínima de 500 píxeles en ambos lados y hasta 10 MB de peso.
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={validateAndContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>

      <BottomTabs activeTab="AddRecipe" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 5,
  },
  inputError: {
    borderColor: '#FF5C5C',
  },
  errorText: {
    color: '#FF5C5C',
    marginBottom: 10,
    fontSize: 12,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  experienceOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  experienceOptionSelected: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#555',
    fontSize: 14,
    marginTop: 8,
  },
  imageHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  step: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  stepActive: {
    backgroundColor: '#FFA500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: {
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CreateRecipeStepOneScreen;
