import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Platform , Animated, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = ({ busqueda, setBusqueda, setConsultarApiClima }) => {
    const { pais, ciudad } = busqueda;

    const [ animacionBoton ] = useState( new Animated.Value(1) );

    const animacionEntrada = () => {
        Animated.spring( animacionBoton, {
            toValue: .9,
            useNativeDriver: true
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring( animacionBoton, {
            toValue: 1,
            friction: 2,
            tension: 30,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    const clickBuscarClima = async () => {
        const validacion = await validarFormulario();

        if( !validacion ) {
            Alert.alert(
                'Error', // Titulo de la alerta,
                'Ambos campos son obligatorios', // mensaje de alerta
                [
                    { text: 'Aceptar'} // Arreglo de botones
                ]
            );
            return false;
        }

        setConsultarApiClima(true);
    }

    const validarFormulario = async () => {
        const validacion = true;
        if( pais === '' || ciudad === '' ) {
            return false
        }
        return validacion;
    }

    return (
        <View style={styles.formulario}>
            <View>
                <TextInput
                    value={ciudad}
                    style={ styles.input }
                    placeholder='Ciudad'
                    placeholderTextColor='#555'
                    onChangeText={ (ciudad) => setBusqueda( {...busqueda, ciudad}) }
                />
            </View>
            <View>
                <Picker
                    style={ styles.selectPais }
                    itemStyle={{ height: 100 }}
                    selectedValue={ pais }
                    onValueChange={ (pais) => setBusqueda( {...busqueda, pais}) }
                >
                    <Picker.Item label='- Seleccionar país -' value='' />
                    <Picker.Item label='Colombia' value='CO' />
                    <Picker.Item label='Estados Unidos' value='US' />
                    <Picker.Item label='México' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                    <Picker.Item label='España' value='ES' />
                    <Picker.Item label='Perú' value='PE' />
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={ () => animacionEntrada() }
                onPressOut={ () => animacionSalida() }
                onPress={ () => clickBuscarClima() }
            >
                <Animated.View style={ [styles.btnBuscar, estiloAnimacion] }>
                    <Text style={ styles.txtBuscar }>Buscar clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>            
        </View>
    )
}

const styles = StyleSheet.create({
    formulario: {

    },
    input: {
        padding: 10,
        height: 40,
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30
    },
    btnBuscar: {
        marginTop: 30,
        backgroundColor: '#000000',
        padding: 10,
        justifyContent: 'center'
    },
    txtBuscar: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 16
    },
    selectPais: {
        height: Platform.OS === 'ios' ? 100 : 40,
        backgroundColor: '#FFFFFF',
    }
})

export default Formulario