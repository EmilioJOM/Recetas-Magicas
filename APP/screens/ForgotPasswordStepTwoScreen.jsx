import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import TermsAndConditions from '../components/TermsAndConditions';
import { recoverPassword2 } from '../api/auth';

const CODE_LENGTH = 6;

const schema = yup.object().shape({
    code: yup
        .string()
        .required('El código es obligatorio')
        .matches(new RegExp(`^\\d{${CODE_LENGTH}}$`), `El código debe tener ${CODE_LENGTH} dígitos`),
});

export default function ForgotPasswordStepTwoScreen() {
    const navigation = useNavigation();
    const inputsRef = useRef([]);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { code: '' },
    });

    const codeValue = watch('code');

    // Para manejar cada input y actualizar el valor completo "code"
    const handleChange = (text, index) => {
        if (/^\d?$/.test(text)) {
            const codeArray = codeValue.split('').slice(0, CODE_LENGTH);
            codeArray[index] = text;
            // Rellenar espacios vacíos con ''
            for (let i = 0; i < CODE_LENGTH; i++) {
                if (!codeArray[i]) codeArray[i] = '';
            }
            const newCode = codeArray.join('');
            setValue('code', newCode);

            if (text !== '' && index < CODE_LENGTH - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && codeValue[index] === '') {
            if (index > 0) inputsRef.current[index - 1].focus();
        }
    };

    const route = useRoute();
    const { email } = route.params;

    const onSubmit = async (data) => {
        try {
            const response = await recoverPassword2({
                email: email,
                code: data.code
            });
            const token = response.data.token;
            console.log(response)
            // Suponiendo que la respuesta tiene una propiedad 'success' o similar
            if (response) {
                console.log('Código validado correctamente:', response.data);
                navigation.navigate('ForgotPasswordStepThreeScreen', { token });
            } else {
                console.warn('Código inválido:', response.data);
                Alert.alert('Código inválido', response.data.message || 'El código ingresado no es válido o expiró.');
            }

        } catch (error) {
            console.error('Error al validar código:', error);
            Alert.alert('Error', 'Ocurrió un error inesperado. Intenta más tarde.');
        }
    };


    // Obtener array para mostrar cada dígito en inputs separados
    const codeArray = codeValue.padEnd(CODE_LENGTH, ' ').split('').slice(0, CODE_LENGTH);

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Verificación</Text>
                <Text style={styles.containerCodeText}>
                    Enviamos un código a tu correo electrónico. Si no lo recibiste, revisá tu carpeta de spam o{' '}
                    <Text style={styles.resendCodeText} onPress={() => console.log('Reenviar código')}>
                        hacé clic aquí.
                    </Text>
                </Text>

                <View style={styles.codeContainer}>
                    {codeArray.map((digit, index) => (
                        <Controller
                            key={index}
                            control={control}
                            name="code"
                            render={() => (
                                <TextInput
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    style={[styles.inputCode, errors.code && { borderColor: '#f00' }]}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit.trim()}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    autoFocus={index === 0}
                                    textAlign="center"
                                />
                            )}
                        />
                    ))}
                </View>
                {errors.code && <Text style={styles.error}>{errors.code.message}</Text>}

                <Button title="Verificar" onPress={handleSubmit(onSubmit)} />
            </View>
            <TermsAndConditions />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        color: '#E08D3E',
    },
    containerCodeText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#828282',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    resendCodeText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    inputCode: {
        borderWidth: 2,
        borderColor: '#E08D3E',
        borderRadius: 10,
        width: 40,
        height: 50,
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    error: {
        color: '#f00',
        textAlign: 'center',
        marginBottom: 8,
    },
});
