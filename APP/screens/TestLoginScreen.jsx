import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import InputShow from '../components/InputShow';
import TermsAndConditions from '../components/TermsAndConditions';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    email: yup.string()
        .email('El email ingresado no es válido')
        .required('El email es obligatorio'),

    password: yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

export default function TestLoginScreen() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { signin, errors: errorsApi, user } = useAuth();
    const [loginError, setLoginError] = useState(null);

    const onSubmit = async (data) => {
        setLoginError(null);
        const success = await signin({ ...data, rememberMe });

        if (success) {
            navigation.navigate('HomeScreen');
        } else if (errorsApi && errorsApi.length > 0) {
            // Mostrá el primer mensaje del backend
            const firstError = errorsApi[0];
            const msg = typeof firstError === 'object' && firstError.message
                ? firstError.message
                : firstError;
            setLoginError(msg);
        } else {
            setLoginError('Email o contraseña incorrectas.');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.containerPadre}>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <Text style={styles.subtitle}>Ingresa tu email para entrar en la app</Text>

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

                    {loginError && <Text style={styles.error}>{loginError}</Text>}

                    <View style={styles.rememberRow}>
                        <View style={styles.switchContainer}>
                            <Switch
                                value={rememberMe}
                                onValueChange={setRememberMe}
                                trackColor={{ false: '#ccc', true: '#E08D3E' }}
                                thumbColor={rememberMe ? '#fff' : '#f4f3f4'}
                            />
                            <Text style={styles.rememberText}>Recordarme en este dispositivo</Text>
                        </View>
                    </View>

                    <Button title="Continuar" onPress={handleSubmit(onSubmit)} />

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordStepOneScreen')}>
                        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <TermsAndConditions />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerPadre: {
        flex: 1,
        justifyContent: 'space-between',
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
    forgotText: {
        fontSize: 16,
        color: '#3B82F6',
        textDecorationLine: 'underline',
        marginTop: 12,
    },
});
