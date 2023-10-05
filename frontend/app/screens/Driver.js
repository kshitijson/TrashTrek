import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get('window');

function Driver() {
    const navigation = useNavigation()
    const [binsLocation, setBinsLocation] = useState([
        {
            name: 'adassa',
            status: false,
            location: {
                lat: 19.0684654,
                long: 72.8921441,
            },
        },
        {
            name: 'hnghghj',
            status: false,
            location: {
                lat: 19.06879,
                long: 72.8977851,
            },
        },
        {
            name: 'sadasdsa',
            status: false,
            location: {
                lat: 19.068879,
                long: 72.8915112,
            },
        },
    ]);

    const toggleBinStatus = (index) => {
        const updatedBins = [...binsLocation];
        updatedBins[index].status = !updatedBins[index].status;
        setBinsLocation(updatedBins);
    };

    const renderBinItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.binContainer}
            onPress={() => toggleBinStatus(index)}>
            <Text>{`Bin ---> ${item.name} `}</Text>
            <Text style={{ color: item.status ? 'green' : 'red' }}>{item.status ? 'Empty' : 'Full'}</Text>
        </TouchableOpacity>
    );

    const renderMiniMap = () => (
        <View style={styles.miniMapContainer}>
            <MapView
                style={styles.miniMap}
                initialRegion={{
                    latitude: binsLocation[0].location.lat,
                    longitude: binsLocation[0].location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                {binsLocation.map((bin, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: bin.location.lat,
                            longitude: bin.location.long,
                        }}
                        title={`Bin: ${bin.name}`}
                        description={bin.status ? 'Empty' : 'Full'}
                    />
                ))}
            </MapView>
        </View>
    );

    const handleLogout = () => {
        console.log("Logout")
        navigation.navigate("Welcome")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Bins Location and Status</Text>
            <FlatList
                data={binsLocation}
                renderItem={renderBinItem}
                keyExtractor={(item) => item.name}
            />
            {renderMiniMap()}
        </View>
    );
}

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    binContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    miniMapContainer: {
        height: height * 0.5,
        width,
        borderWidth: 1,
    },
    miniMap: {
        flex: 1,
    },
}); */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        marginTop: 20,
        marginBottom: 20
    },
    logoutButton: {
        backgroundColor: 'lightgray',
        padding: 8,
        borderRadius: 5,
    },
    binContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: width * 0.9,
    },
    miniMapContainer: {
        flex: 1,
        height: height * 0.9,
        width: width * 0.9,
        borderWidth: 1,
    },
    miniMap: {
        flex: 1,
    },
    title: {
        marginTop: 80,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold"
    }
});


export default Driver;
