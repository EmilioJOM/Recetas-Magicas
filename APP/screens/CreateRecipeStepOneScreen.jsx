import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from '../components/BottomTabs'

const CreateRecipeStepOneScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const experienceOptions = ['Principiante', 'Intermedio', 'Experto'];

  return (
    <View style={styles.container}>
      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <View style={[styles.step, styles.stepActive]} />
        <View style={styles.step} />
        <View style={styles.step} />
      </View>

      <Text style={styles.title}>Crear Receta</Text>

      {/* Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta"
        value={name}
        onChangeText={setName}
      />

      {/* Descripción */}
      <Text style={styles.label}>Descripción breve</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Breve descripción de la receta"
        value={description}
        multiline
        onChangeText={setDescription}
      />

      {/* Selector de experiencia */}
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

      {/* Carga de imagen */}
      <Text style={styles.label}>Imagen principal</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="cloud-upload-outline" size={36} color="#999" />
            <Text style={styles.uploadText}>Seleccionar o arrastrar los archivos aquí</Text>
            <Text style={styles.imageHint}>
              Sube tu imagen JPG, JPEG, PNG o WEBP, con una resolución mínima de 500 píxeles en
              ambos lados y hasta 10 MB de peso.
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Botones */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateRecipeStepTwoScreen')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      <BottomTabs activeTab="AddRecipe" />
    </View>
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
    marginBottom: 15,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginBottom: 20,
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
