import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Button,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {

    const [username, setUsername] = useState("")
    const [passwd, setPasswd] = useState("")
    const [selectedValue, setSelectedValue] = useState('customer');

    const navigation = useNavigation();

    const handleLogin = () => {

        const navigator = {
            customer: "AddDustbin",
            admin: "Admin",
            driver: "Driver"
        }

        const formData = {
            email: username,
            password: passwd,
            userType: selectedValue
        }

        console.log(formData)

        fetch('http://192.168.2.248:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                }
                return response.json();
            })
            .then(async (data) => {
                console.log(data.Message)
                await AsyncStorage.setItem('token', data.token)
                navigation.navigate(navigator[selectedValue])
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });




    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.usrInput}
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
            />
            <TextInput
                style={styles.passwdInput}
                value={passwd}
                onChangeText={(text) => setPasswd(text)}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={styles.pickerView}>
                <Text>Who are you:</Text>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Customer" value="customer" />
                    <Picker.Item label="Driver" value="driver" />
                    <Picker.Item label="Admin" value="admin" />
                </Picker>
            </View>
            <Button title="Login" onPress={handleLogin}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    usrInput: {
        height: 50,
        width: 200,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        paddingStart: 20
    },
    passwdInput: {
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        paddingStart: 20,
    },
    pickerView: {
        marginTop: 20,
        marginBottom: 10
    },
    picker: {
        width: 200,
        height: 50,
    },
})

export default Login
