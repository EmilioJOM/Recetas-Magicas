import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button'
import InputShow from '../components/InputShow'
import TermsAndConditions from '../components/TermsAndConditions'
import { useAuth } from '../context/AuthContext';
// Validación con Yup

const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Mínimo 6 caracteres')
        .required('La contraseña es obligatoria'),

    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
        .required('Repetir la contraseña es obligatorio'),
});

export default function RegisterStepThreeScreen() {
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const route = useRoute();
    const { alias, email, paidUser } = route.params;
    const { signup, errors: signupErrors } = useAuth();


    const onSubmit = async (data) => {
        const finalData = {
            alias,
            email,
            password: data.password,
        };

        console.log('Datos finales a enviar:', finalData);

        try {
            await signup(finalData); // esto guarda el usuario en contexto y AsyncStorage

            if (paidUser) {
                navigation.navigate('RegisterStepFourScreen', finalData); // se continúa con el pago
            } else {
                navigation.navigate('HomeScreen'); // va directo al home
            }

        } catch (e) {
            console.error('Error en el registro:', e);
            // El AuthContext ya maneja los errores y los guarda en `signupErrors`
            // Podés mostrarlos si querés:
            Alert.alert('Error', 'No se pudo crear la cuenta. Revisá los datos o intenta más tarde.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Crea tu cuenta</Text>
                <Text style={styles.subtitle}>Ingresa tus datos para crear la cuenta</Text>

                {/* Contraseña */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <InputShow
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

                {/* Contraseña Repetida */}
                <Controller
                    control={control}
                    name="repeatPassword"
                    render={({ field: { onChange, value } }) => (
                        <InputShow
                            placeholder="Repita la Contraseña"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.repeatPassword && <Text style={styles.error}>{errors.repeatPassword.message}</Text>}

                <Button title="Continuar" onPress={handleSubmit(onSubmit)} />

            </View>
            <TermsAndConditions />
        </ScrollView >

    );
}

// Estilos con StyleSheet
const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center',
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: -12,
        color: '#E08D3E',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 16,
    },
    error: {
        color: '#f00',
    },
    rememberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        marginLeft: 8,
    },
    containerAccount: {
        flexDirection: 'row',
        alignItems: 'center', // opcional, para alinear verticalmente
        marginTop: 12,
    },
    textAccount: {
        fontSize: 16,
    },
    forgotText: {
        fontSize: 16,
        color: '#3B82F6',
        textDecorationLine: 'underline',
    },

});
