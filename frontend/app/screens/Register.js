import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Button,
    Alert,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import * as Location from "expo-location"

function Register() {

    const [username, setUsername] = useState("")
    const [passwd, setPasswd] = useState("")
    const [confPasswd, setConfPasswd] = useState("")
    const [address, setAddress] = useState("")
    const [selectedValue, setSelectedValue] = useState('Mumbai City');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    const navigation = useNavigation()

    const handleRegister = () => {

        console.log(location.coords.latitude)

        if (passwd !== confPasswd) {
            return Alert.alert("Error", "Password and Confirm Password does not match", [
                { text: "OK" }
            ])
        }

        const formData = {
            email: username,
            password: passwd,
            address: address,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            },
            region: selectedValue
        }

        console.log(formData)

        fetch('http://192.168.2.248:5000/api/register', {
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
            .then((data) => {
                console.log(data)
                Alert.alert("Success", "Registered Successfully", [
                    { text: "OK" }
                ])
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
                placeholder="Email ID"
            />
            <TextInput
                style={styles.passwdInput}
                value={passwd}
                onChangeText={(text) => setPasswd(text)}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.passwdInput}
                value={confPasswd}
                onChangeText={(text) => setConfPasswd(text)}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                style={styles.passwdInput}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
            />
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Mumbai City" value="Mumbai City" />
                <Picker.Item label="Mumbai Suburban" value="Mumbai Suburban" />
                <Picker.Item label="Navi Mumbai" value="Navi Mumbai" />
                <Picker.Item label="Thane" value="Thane" />
            </Picker>
            <Button title="Register" onPress={handleRegister}></Button>
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
        marginBottom: 20
    },
    picker: {
        width: 200,
        height: 50,
    },
})

export default Register
