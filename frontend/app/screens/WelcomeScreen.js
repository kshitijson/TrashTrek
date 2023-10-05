import { React, useEffect } from 'react'
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {

    const navigation = useNavigation();

    const handleLoginClick = () => {
        // Navigate to the 'Another' screen
        navigation.navigate('Login');
    };

    const handleRegisterClick = () => {
        // Navigate to the 'Another' screen
        navigation.navigate('Register');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require("../assets/bg.jpg")}
        >

            <Text style={styles.logo}>TrashTrek</Text>

            <View style={styles.loginButton}>
                <TouchableOpacity>
                    <Text style={styles.Text} onPress={handleLoginClick}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.registerButton}>
                <TouchableOpacity>
                    <Text style={styles.Text} onPress={handleRegisterClick}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: "#fc5c65",
        justifyContent: "center",
        alignItems: "center",
    },
    Text: {
        fontSize: 20
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        position: 'absolute',
        top: 100,
        fontSize: 50,
        fontWeight: "bold"
    }
})

export default WelcomeScreen
