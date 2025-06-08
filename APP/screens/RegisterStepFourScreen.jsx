import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';


// Validación Yup
const schema = yup.object().shape({
    cardNumber: yup
        .string()
        .matches(/^\d{16}$/, 'Debe tener 16 dígitos numéricos')
        .required('Número de tarjeta requerido'),

    cardHolderName: yup
        .string()
        .required('Nombre del titular requerido'),

    expirationDate: yup
        .string()
        .required('Fecha de vencimiento requerida')
        .test('valid-date', 'Fecha inválida. Usar MM/AA y debe ser futura', (value) => {
            if (!value) return false;
            const [monthStr, yearStr] = value.split('/');

            const month = parseInt(monthStr, 10);
            const year = parseInt(`20${yearStr}`, 10); // convierte "25" a 2025

            if (isNaN(month) || isNaN(year)) return false;
            if (month < 1 || month > 12) return false;

            const now = new Date();
            const expDate = new Date(year, month - 1, 1); // primer día del mes

            // Vencimiento debe ser igual o posterior al mes actual
            return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
        }),


    securityCode: yup
        .string()
        .matches(/^\d{3,4}$/, 'Código inválido. Debe tener 3 o 4 dígitos')
        .required('Código de seguridad requerido'),
});

export default function RegisterStepFourScreen() {
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log('Datos de tarjeta:', data);
        navigation.navigate('RegisterStepFiveScreen'); // Navega al paso 5
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Datos de Tarjeta</Text>
            <Text style={styles.subtitle}>Ingresá tus datos de tarjeta</Text>
            {/* Número de tarjeta */}
            <Controller
                control={control}
                name="cardNumber"
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeholder="Número de tarjeta (16 dígitos)"
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        maxLength={16}
                    />
                )}
            />
            {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber.message}</Text>}

            {/* Nombre del titular */}
            <Controller
                control={control}
                name="cardHolderName"
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeholder="Nombre y apellido del titular"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.cardHolderName && <Text style={styles.error}>{errors.cardHolderName.message}</Text>}

            {/* Fecha de vencimiento */}
            <Controller
                control={control}
                name="expirationDate"
                render={({ field: { onChange, value } }) => {
                    const handleDateChange = (text) => {
                        // Elimina todo lo que no sea número
                        const cleaned = text.replace(/\D/g, '');

                        let formatted = cleaned;
                        if (cleaned.length > 2) {
                            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
                        }

                        onChange(formatted);
                    };

                    return (
                        <Input
                            placeholder="Fecha de vencimiento (MM/AA)"
                            keyboardType="number-pad"
                            onChangeText={handleDateChange}
                            value={value}
                            maxLength={5} // MM/AA = 5 caracteres
                        />
                    );
                }}
            />


            {errors.expirationDate && <Text style={styles.error}>{errors.expirationDate.message}</Text>}

            {/* Código de seguridad */}
            <Controller
                control={control}
                name="securityCode"
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeholder="Código de seguridad (CVV)"
                        keyboardType="number-pad"
                        onChangeText={onChange}
                        value={value}
                        maxLength={4}
                    />
                )}
            />
            {errors.securityCode && <Text style={styles.error}>{errors.securityCode.message}</Text>}

            <Button title="Continuar" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
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
        textAlign: 'center',
        marginBottom: 0,
        color: '#E08D3E',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,
    },
    error: {
        color: '#f00',
        marginTop: -12,
        marginBottom: 8,
    },
});
