import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegurate de tener instalado `@expo/vector-icons` o `react-native-vector-icons`

export default function Input({
    placeholder,
    secureTextEntry = false,
    value,
    onChangeText,
    style,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.inputContainer, style]}>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry && !showPassword}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                autoCapitalize="none"
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#999"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    input: {
        flex: 1,
        padding: 0,
    },
    icon: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 0,
    },
});
