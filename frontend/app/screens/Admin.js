import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const InputForm = ({ onSubmit, inputs }) => {
    const [formData, setFormData] = useState(inputs.reduce((acc, input) => ({ ...acc, [input]: '' }), {}));

    const handleInputChange = (input, value) => {
        setFormData(prevData => ({ ...prevData, [input]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData(inputs.reduce((acc, input) => ({ ...acc, [input]: '' }), {}));
        console.log(formData)
    };

    return (
        <View>
            {inputs.map(input => (
                <View key={input}>
                    <Text>{input}:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData[input]}
                        onChangeText={(value) => handleInputChange(input, value)}
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const Admin = () => {
    const [activeForm, setActiveForm] = useState(null);

    const handleFormSubmit = (data) => {
        // Handle form submission logic based on activeForm
        console.log(`Submitting form for ${activeForm}:`, data);
        setActiveForm(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trucks</Text>
                <TouchableOpacity style={styles.button} onPress={() => setActiveForm('addTruck')}>
                    <Text>Add Truck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setActiveForm('deleteTruck')}>
                    <Text>Delete Truck</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Drivers</Text>
                <TouchableOpacity style={styles.button} onPress={() => setActiveForm('addDriver')}>
                    <Text>Add Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setActiveForm('deleteDriver')}>
                    <Text>Delete Driver</Text>
                </TouchableOpacity>
            </View>

            {activeForm && (
                <InputForm
                    onSubmit={handleFormSubmit}
                    inputs={activeForm === 'addTruck' || activeForm === 'deleteTruck' ? ['truckRegNo', 'pucDate'] : ['driverName', 'licenseNo']}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonSubmit: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },
});

export default Admin;
