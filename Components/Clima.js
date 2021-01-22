import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Clima = ({resultadoApi}) => {
    const { name, main } = resultadoApi;
    
    if( !name ) { return null; }

    //Grados kelvin
    const kelvin = 273.15;

    return (
        <View style={styles.clima}>
            <Text style={[ styles.texto, styles.actual ]}>
                { parseInt( main.temp - kelvin ) }
                <Text style={styles.temperatura}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `http://openweathermap.org/img/w/${resultadoApi.weather[0].icon}.png` }}
                />
            </Text>

            <View style={ styles.minmax }>
                <Text style={styles.texto}> Min {' '}
                    <Text style={styles.temperatura}>
                        { parseInt(main.temp_min - kelvin) } &#x2103;
                    </Text>
                </Text>

                <Text style={styles.texto}> Max {' '}
                <Text style={styles.temperatura}>
                        { parseInt(main.temp_max - kelvin) } &#x2103;
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    clima: {
        marginBottom: 10
    },
    texto: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight:20
    },
    actual: {
        fontSize: 70,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    minmax: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export default Clima