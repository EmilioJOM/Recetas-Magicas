import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Alert,
    Platform,
    ScrollView,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import BottomTabs from '../components/BottomTabs';

const ingredientSchema = Yup.object().shape({
    quantity: Yup.number()
        .typeError('Cantidad debe ser un número')
        .positive('Cantidad debe ser positiva')
        .required('Cantidad es requerida'),
    unit: Yup.string()
        .min(1, 'Unidad es requerida')
        .required('Unidad es requerida'),
    name: Yup.string()
        .min(1, 'Nombre es requerido')
        .required('Nombre es requerido'),
});

const CreateRecipeStepTwoScreen = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const addIngredient = async () => {
        try {
            await ingredientSchema.validate(
                { quantity, unit, name },
                { abortEarly: false }
            );
            // Si pasa validación, agrego ingrediente
            setIngredients([...ingredients, { quantity, unit, name }]);
            setQuantity('');
            setUnit('');
            setName('');
            setErrors({});
            setModalVisible(false);
        } catch (validationError) {
            // Mapear errores para mostrar al usuario
            const newErrors = {};
            validationError.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    const removeIngredient = (index) => {
        const updated = [...ingredients];
        updated.splice(index, 1);
        setIngredients(updated);
    };

    const goToNextStep = () => {
        if (ingredients.length === 0) {
            Alert.alert('Error', 'Debés agregar al menos un ingrediente para continuar.');
            return;
        }
        navigation.navigate('CreateRecipeStepThreeScreen');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Barra de progreso */}
                <View style={styles.progressContainer}>
                    <View style={[styles.step, styles.stepActive]} />
                    <View style={[styles.step, styles.stepActive]} />
                    <View style={styles.step} />
                </View>

                <Text style={styles.title}>Ingredientes</Text>

                <FlatList
                    data={ingredients}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 140 }}
                    renderItem={({ item, index }) => (
                        <View style={styles.ingredientCard}>
                            <Text style={styles.ingredientText}>
                                {item.quantity} {item.unit} - {item.name}
                            </Text>
                            <TouchableOpacity onPress={() => removeIngredient(index)}>
                                <Ionicons name="close-circle" size={24} color="#FF5C5C" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            Agrega tus ingredientes aquí
                        </Text>
                    }
                />

                {/* Botones CANCELAR y CONTINUAR juntos */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelActionButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToNextStep} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón flotante para agregar ingrediente */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => {
                        setErrors({});
                        setQuantity('');
                        setUnit('');
                        setName('');
                        setModalVisible(true);
                    }}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </TouchableOpacity>

                {/* Modal para cargar ingrediente */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="none"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalOverlay}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            >
                                <ScrollView
                                    contentContainerStyle={styles.modalContent}
                                    keyboardShouldPersistTaps="handled"
                                >
                                    <Text style={styles.modalTitle}>Nuevo Ingrediente</Text>

                                    <TextInput
                                        style={[styles.input, errors.quantity && styles.inputError]}
                                        placeholder="Cantidad (e.g., 200)"
                                        keyboardType="numeric"
                                        value={quantity}
                                        onChangeText={setQuantity}
                                    />
                                    {errors.quantity && (
                                        <Text style={styles.errorText}>{errors.quantity}</Text>
                                    )}

                                    <TextInput
                                        style={[styles.input, errors.unit && styles.inputError]}
                                        placeholder="Unidad (e.g., g, ml)"
                                        value={unit}
                                        onChangeText={setUnit}
                                    />
                                    {errors.unit && (
                                        <Text style={styles.errorText}>{errors.unit}</Text>
                                    )}

                                    <TextInput
                                        style={[styles.input, errors.name && styles.inputError]}
                                        placeholder="Nombre del ingrediente"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    {errors.name && (
                                        <Text style={styles.errorText}>{errors.name}</Text>
                                    )}

                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Text style={styles.cancelButton2}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={addIngredient}
                                        >
                                            <Text style={styles.addButtonText}>Agregar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>



                {/* Bottom Tabs */}
                <BottomTabs activeTab="AddRecipe" />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    ingredientCard: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    ingredientText: { fontSize: 16 },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 40,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 140,
        right: 20,
        backgroundColor: '#FFA500',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
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
        marginBottom: 8,
        marginLeft: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        //marginTop: 270,
    },
    cancelButton: {
        fontSize: 16,
        color: '#FFA500',
        marginRight: 20,
        fontWeight: 'bold',
    },
    cancelButton2: {
        fontSize: 16,
        color: '#FFA500',
        marginRight: 20,
        marginTop: 8,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreateRecipeStepTwoScreen;
