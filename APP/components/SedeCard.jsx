import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SedeCard({
    title,
    direccion,
    ciudad,
    image,
    userImage,
    userName,
    userAlias,
    onPress,
}) {
    return (
        <View style={styles.cardContainer}>
            <Image source={image} style={styles.image} resizeMode="cover" />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.locationText}>
                    {direccion} - {ciudad}
                </Text>

                <View style={styles.userRow}>
                    <View style={styles.userInfo}>
                        <Image source={userImage} style={styles.userImage} />
                        <View>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userAlias}>{userAlias}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    infoContainer: {
        paddingTop: 8,
        //backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    locationText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    userAlias: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        backgroundColor: '#FF8C00',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
