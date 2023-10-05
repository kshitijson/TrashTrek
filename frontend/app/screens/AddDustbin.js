import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import * as Location from "expo-location"
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddDustbin() {

    const [binName, setBinName] = useState("")
    const [bins, setBins] = useState([
        { name: 'Sargam-02-red', status: false },
        { name: 'Sargam-01-green', status: false },
    ]);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [decoded, setDecoded] = useState("")



    useEffect(() => {


        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const token = await AsyncStorage.getItem('token');
            const decodedTok = await jwt_decode(token);
            setDecoded(decodedTok)

        })();
    }, []);

    const toggleBinStatus = (index) => {
        const updatedBins = [...bins];
        updatedBins[index].status = !updatedBins[index].status;
        setBins(updatedBins);
    };


    const fetchBins = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decodedTok = await jwt_decode(token);
            setDecoded(decodedTok);

            const response = await fetch('http://192.168.2.248:5000/api/getBin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: decoded }),
            });

            if (!response.ok) {
                console.log('Network response was not ok');
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.log('Response is not JSON');
                throw new Error('Response is not JSON');
            }

            const data = await response.json();
            setBins(data);
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };


    const handleDeleteBin = () => {
        fetch('http://192.168.2.248:5000/api/dropBin', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: binName }),
        })
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                Alert.alert("Success", "Deleted Successfully", [
                    { text: "OK" }
                ])
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    }


    const handleAddBin = () => {


        const formData = {
            name: binName,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            },
            id: decoded
        }

        console.log(formData)

        fetch('http://192.168.2.248:5000/api/addBin', {
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
                Alert.alert("Success", "Added Successfully", [
                    { text: "OK" }
                ])
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    }

    const changeStatus = (status, name) => {
        fetch('http://192.168.2.248:5000/api/editStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, status: status === "Full" ? false : true }),
        })
            .then(response => {
                if (!response.ok) {
                    console.log('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                Alert.alert("Success", "Added Successfully", [
                    { text: "OK" }
                ])
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    }

    return (

        <View style={styles.container}>
            <Text style={{
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 30,
                marginBottom: 100
            }}>Add / Remove Dustbin</Text>
            <Text>Enter Dustbin Name: </Text>
            <TextInput
                style={styles.input}
                value={binName}
                onChangeText={(text) => setBinName(text)}
                placeholder="<Society>-<Bin number>-<Color>"
            />
            <View style={styles.buttons}>
                <Button title='Add Dustbin' style={{ marginRight: 10 }} onPress={handleAddBin} />
                <Text>___</Text>
                <Button title='Remove Dustbin' style={{ marginLeft: 10 }} onPress={handleDeleteBin} />
            </View>

            <TouchableOpacity onPress={fetchBins}>
                <Text style={{ marginTop: 20, fontSize: 20 }}>Bins:</Text>
            </TouchableOpacity>
            {bins.map((bin, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.binContainer}
                    onPress={() => toggleBinStatus(index)}>
                    <Text>{`Bin ${index + 1} ::: ${bin.name} ::: `}</Text>
                    <Text style={{ color: bin.status ? 'green' : 'red' }} onPress={changeStatus(bin.status, bin.name)}>
                        {bin.status ? 'Empty' : 'Full'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 50,
        width: 270,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        paddingStart: 20
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    binContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    }

})

export default AddDustbin
