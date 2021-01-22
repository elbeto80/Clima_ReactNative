import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Clima from './Components/Clima';
import Formulario from './Components/Formulario';

const App = () => {
    const [ busqueda, setBusqueda ] = useState({
        cuidad: '',
        pais: ''
    });

    const ocultarTeclado = () => {
        Keyboard.dismiss();
    }

    const [consultarApiClima, setConsultarApiClima] = useState(false);
    const [resultadoApi, setResultado] = useState({})

    const [bgColor, setBgColor] = useState('rgb(71, 149, 212)');
    const bgColorApp = {
        backgroundColor: bgColor
    }

    useEffect(() => {
        const getApi = async () => {
            if( consultarApiClima ) {
                const { ciudad, pais } = busqueda;
                const key = '9d4c73eb21f990a643ac5dd70c123374';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

                try {
                    const respuesta = await fetch(url);
                    const resultado = await respuesta.json();
                    setResultado(resultado);

                    //Modifica el color de la aplicación segun temperatura
                    const kelvin = 273.15;
                    const { main } = resultado;
                    const tempeActual = main.temp - kelvin;
                    if( tempeActual < 10 ) {
                        setBgColor( 'rgb(105,108,149)' );
                    } else if ( tempeActual >= 10 && tempeActual < 25) {
                        setBgColor( 'rgb(71, 149, 212)' );
                    } else {
                        setBgColor( 'rgb(178,28,61)' );
                    }

                } catch (error) {
                    Alert.alert(
                        'Error', // Titulo de la alerta,
                        'No hay resultado para la selección', // mensaje de alerta
                        [
                            { text: 'Aceptar'} // Arreglo de botones
                        ]
                    );
                }
                setConsultarApiClima(false);
            }
        }
        getApi();
    }, [consultarApiClima])

    return (
        <>
            <TouchableWithoutFeedback onPress={ () => ocultarTeclado()}>
                <View style={ [styles.contenedor, bgColorApp] }>
                    <View style={styles.contenido}>
                        <Clima resultadoApi={resultadoApi} />
                        <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultarApiClima={setConsultarApiClima} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        // paddingTop: Platform.OS === 'ios' ? 45 : 12,
        flex: 1,
        justifyContent: 'center'
    },
    contenido: {
        marginHorizontal: '2.5%'
    }
})

export default App