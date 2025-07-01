import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { useAuth } from '../context/AuthContext'; // si estás usando contexto
import { Alert } from 'react-native';


export default function PantallaPaso3() {
    const route = useRoute();
    const { recipeId } = route.params || {};
    const { token } = useAuth(); // <-- si usás AuthContext

    const [pasoTexto, setPasoTexto] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [pasos, setPasos] = useState([]);
    const navigation = useNavigation();
    // Datos mock del usuario (podés cambiar por datos reales)
    const receta = {
        userImage: 'https://randomuser.me/api/portraits/women/68.jpg',
        userName: 'María Pérez',
        userAlias: '@mariap',
    };

    const pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false, // ← Solo una imagen
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            // Solo una imagen, reemplaza la anterior si existía
            setImagenes([{ uri: result.assets[0].uri }]);
        }
    };

    const publicarPaso = () => {
        if (pasoTexto.trim() === '') return;

        const nuevoPaso = {
            texto: pasoTexto.trim(),
            imagenes,
        };

        setPasos([...pasos, nuevoPaso]);
        setPasoTexto('');
        setImagenes([]);
    };

    const goToNextStep = () => {
    if (pasos.length === 0) {
        Alert.alert("Error", "Agregá al menos un paso antes de continuar.");
        return;
    }
    enviarPasoAPaso(); // envía todo
    };


    const enviarPasoAPaso = async () => {
        if (!recipeId || !token) {
            Alert.alert("Error", "Faltan datos para continuar.");
            return;
        }

        try {
            console.log("🔧 Iniciando envío de pasos...");
            const formData = new FormData();

            // 1. Crear el archivo JSON de pasos
            // 1. Crear el archivo JSON de pasos con "instruction" y "foto"
            const pasosData = pasos.map((paso) => ({
            instruction: paso.texto,
            foto: paso.imagenes.length > 0, // true si tiene imágenes
            }));

            const jsonContent = JSON.stringify({ steps: pasosData }, null, 2);
            const jsonPath = FileSystem.documentDirectory + 'data.json';

            await FileSystem.writeAsStringAsync(jsonPath, jsonContent);
            console.log("📄 JSON creado con pasos:", jsonContent);

            console.log(jsonContent)

            formData.append('data', {
                uri: jsonPath,
                name: 'data.json',
                type: 'application/json',
            });

            // 2. Agregar imágenes
            let imageIndex = 0;
            for (const paso of pasos) {
                for (const img of paso.imagenes) {
                    const fileInfo = await FileSystem.getInfoAsync(img.uri);
                    if (!fileInfo.exists) continue;

                    formData.append('stepPhotos', {
                        uri: img.uri,
                        name: `photo_${imageIndex}.jpg`,
                        type: 'image/jpeg',
                    });
                    imageIndex++;
                }
            }

            // 3. Envío
            const response = await fetch(`https://recetas-magicas-api.onrender.com/recipes/crearReceta3/${recipeId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.text();

            if (!response.ok) {
                console.error("❌ Error al subir pasos:", result);
                Alert.alert("Error", "No se pudieron subir los pasos.");
            } else {
                console.log("✅ Pasos subidos correctamente:", result);
                Alert.alert("Éxito", "Receta completa.");
                navigation.navigate('HomeScreen');
            }
        } catch (error) {
            console.error("❌ Error inesperado:", error.message);
            Alert.alert("Error", "Ocurrió un problema al subir los pasos.");
        }
    };




    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
                {/* Barra de progreso */}
                <View style={styles.progressContainer}>
                    <View style={[styles.step, styles.stepActive]} />
                    <View style={[styles.step, styles.stepActive]} />
                    <View style={[styles.step, styles.stepActive]} /> {/* Paso 3 activo */}
                </View>

                <Text style={styles.sectionTitle}>Paso a paso:</Text>

                {pasos.map((paso, index) => (
                    <View key={index} style={styles.pasoContainer}>
                        <View style={styles.pasoHeader}>
                            <View style={styles.numeroCirculo}>
                                <Text style={styles.numeroTexto}>{index + 1}</Text>
                            </View>
                            <Text style={styles.pasoTexto}>{paso.texto}</Text>
                        </View>

                        {paso.imagenes.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pasoImagenesScroll}>
                                {paso.imagenes.map((img, i) => (
                                    <Image key={i} source={{ uri: img.uri }} style={styles.pasoImagen} />
                                ))}
                            </ScrollView>
                        )}
                    </View>
                ))}

                <View style={styles.publicarBox}>
                    {/* Aquí va la info del usuario con imagen y alias */}
                    <View style={styles.userInfo}>
                        <Image source={{ uri: receta.userImage }} style={styles.userImage} />
                        <View>
                            <Text style={styles.userName}>{receta.userName}</Text>
                            <Text style={styles.userAlias}>
                                {receta.userAlias}
                            </Text>
                        </View>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Describe el paso..."
                        multiline
                        value={pasoTexto}
                        onChangeText={setPasoTexto}
                    />

                    {imagenes.length > 0 && (
                        <ScrollView horizontal style={{ marginVertical: 10 }}>
                            {imagenes.map((img, i) => (
                                <Image key={i} source={{ uri: img.uri }} style={styles.previewImage} />
                            ))}
                        </ScrollView>
                    )}

                    <View style={styles.actionsRow}>
                        <TouchableOpacity onPress={pickImages} style={styles.actionBtn}>
                            <Text style={styles.actionText}>+ Imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={publicarPaso} style={styles.publicarBtn}>
                            <Text style={styles.publicarText}>Publicar paso</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            {/* Botones CANCELAR y CONTINUAR juntos */}
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelActionButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToNextStep} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            {/* Bottom Tabs */}
            <BottomTabs activeTab="AddRecipe" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 10,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    pasoContainer: {
        marginBottom: 20,
    },
    pasoHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    numeroCirculo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    numeroTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pasoTexto: {
        flex: 1,
        fontSize: 15,
        color: '#444',
    },
    pasoImagenesScroll: {
        paddingLeft: 38,
    },
    pasoImagen: {
        width: 140,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
        resizeMode: 'cover',
    },

    publicarBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#fafafa',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
    },
    userAlias: {
        color: '#888',
    },
    input: {
        minHeight: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    previewImage: {
        width: 80,
        height: 80,
        marginRight: 8,
        borderRadius: 8,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionBtn: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
    },
    actionText: {
        color: '#333',
        fontWeight: '600',
    },
    publicarBtn: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#FF8C00',
    },
    publicarText: {
        color: '#fff',
        fontWeight: '600',
    },
    nextButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
    nextButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionButtons: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelActionButtonText: {
        color: '#FFA500',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 15,
    },
});
