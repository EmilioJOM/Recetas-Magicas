import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button'
import Input from '../components/Input'
import TermsAndConditions from '../components/TermsAndConditions'
import { recoverPassword1 } from '../api/auth';

// Validación con Yup
const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
});

export default function ForgotPassowrdStepOneScreen() {
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        try {
            const available = await recoverPassword1({ email: data.email });
            if (available) {
                navigation.navigate('ForgotPasswordStepTwoScreen', {
                    email: data.email,
                });
                console.log('Respuesta del backend:', available.data);
            } else {
                alert('El email no esta registrado.');
            }
        } catch (error) {
            console.error(error);
            alert('Error al verificar datos. Intenta más tarde.');
        }
    };


    return (
        <View style={styles.containerPadre}>
            <View style={styles.container}>
                <Text style={styles.title}>Recupeción de Contraseñas</Text>
                <Text style={styles.subtitle}>Ingresa tu email para recuperar la contraseña</Text>

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Email"
                            secureTextEntry={false}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                {/* Botón */}
                <Button title="Continuar" onPress={handleSubmit(onSubmit)} />
            </View>
            <TermsAndConditions />
        </View>

    );
}

// Estilos con StyleSheet
const styles = StyleSheet.create({
    containerPadre: {
        flex: 1,
        justifyContent: 'space-between'
    },
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
        fontSize: 18,
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
    forgotText: {
        fontSize: 16,
        color: '#3B82F6',
        textDecorationLine: 'underline',
        marginTop: 12,
    },

});
