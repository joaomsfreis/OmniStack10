import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                })
            }
        }

        loadInitialPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    return <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -20.4549301, longitude: -42.6663755 }}>
            <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/40475388?s=460&v=4' }} />
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username: 'diego3g' })
            }}>
                <View style={styles.callout}>
                    <Text style={styles.devName}>João Marcos Soares</Text>
                    <Text style={styles.devBio}>Graduando em Engenharia de Computação - UFOP/ Técinico em Automação Industrial - IFMG</Text>
                    <Text style={styles.devTechs}>Java</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    }
})

export default Main