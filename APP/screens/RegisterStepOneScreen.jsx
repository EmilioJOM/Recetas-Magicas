import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import TermsAndConditions from '../components/TermsAndConditions';
import { authValidate } from '../api/auth';

// Validación con Yup
const schema = yup.object().shape({
    alias: yup
        .string()
        .min(3, 'El alias debe tener al menos 3 caracteres')
        .required('El alias es obligatorio'),
    email: yup
        .string()
        .email('El email ingresado no es válido')
        .required('El email es obligatorio'),
});

export default function RegisterStepOneScreen() {
    const navigation = useNavigation();
    const [paidUser, setPaidUser] = useState(false);
    const [backendError, setBackendError] = useState(null);
    const [suggestedAliases, setSuggestedAliases] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setBackendError(null);
        setSuggestedAliases([]);

        try {
            const available = await authValidate({ alias: data.alias, email: data.email });
            console.log('Respuesta del backend:', available);

            if (available.success) {
                navigation.navigate('RegisterStepTwoScreen', {
                    alias: data.alias,
                    email: data.email,
                    paidUser: paidUser,
                });
            } else {
                setBackendError(available.message || 'El alias o el email ya están registrados.');
                if (available.sugerencias && available.sugerencias.length > 0) {
                    setSuggestedAliases(available.sugerencias);
                }
            }
        } catch (error) {
            console.error('Error en onSubmit:', error);

            if (error.response && error.response.data) {
                const errData = error.response.data;
                setBackendError(errData.message || 'El alias o el email ya están registrados.');
                if (errData.sugerencias && errData.sugerencias.length > 0) {
                    setSuggestedAliases(errData.sugerencias);
                }
            } else {
                setBackendError('Error al verificar datos. Intenta más tarde.');
                setSuggestedAliases([]);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Crea tu cuenta</Text>
                <Text style={styles.subtitle}>Ingresa tus datos para crear la cuenta</Text>

                {/* Alias */}
                <Controller
                    control={control}
                    name="alias"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Alias"
                            secureTextEntry={false}
                            onChangeText={(text) => {
                                onChange(text);
                                setBackendError(null);
                                setSuggestedAliases([]);
                            }}
                            value={value}
                        />
                    )}
                />
                {errors.alias && <Text style={styles.error}>{errors.alias.message}</Text>}

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Email"
                            secureTextEntry={false}
                            onChangeText={(text) => {
                                onChange(text);
                                setBackendError(null);
                                setSuggestedAliases([]);
                            }}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                {/* Mensaje de error y sugerencias en el mismo renglón */}
                {(backendError || suggestedAliases.length > 0) && (
                    <Text style={[styles.error, { flexWrap: 'wrap' }]}>
                        {backendError}{' '}
                        {suggestedAliases.map((alias, i) => (
                            <Text
                                key={alias}
                                onPress={() => {
                                    setValue('alias', alias);
                                    setSuggestedAliases([]);
                                    setBackendError(null);
                                }}
                                style={{ textDecorationLine: 'line', color: '#f00' }}
                            >
                                {alias}
                                {i < suggestedAliases.length - 1 ? ' ' : ''}
                            </Text>
                        ))}
                    </Text>
                )}



                {/* Usuario de Pago */}
                <View style={styles.paidUserRow}>
                    <View style={styles.switchContainer}>
                        <Switch
                            value={paidUser}
                            onValueChange={setPaidUser}
                            trackColor={{ false: '#ccc', true: '#E08D3E' }}
                            thumbColor={paidUser ? '#fff' : '#f4f3f4'}
                        />
                        <Text style={styles.paidUser}> Quiero registrarme como alumno.</Text>
                    </View>
                </View>

                {/* Botón */}
                <Button title="Continuar" onPress={handleSubmit(onSubmit)} />

                <View style={styles.containerAccount}>
                    <Text style={styles.textAccount}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TestLoginScreen')}>
                        <Text style={styles.forgotText}> Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TermsAndConditions />
        </ScrollView>
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
