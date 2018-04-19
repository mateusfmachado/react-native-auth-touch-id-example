import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/* 
    Tela simples com texto inicio e um botão que redireciona para a 
    rota que precisa de autenticação;

    A função (this.props.history.push('/user')) utiliza uma propriedade 
    da estrutura de rotas que redireciona para a rota 'user'
*/
export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>INICIO</Text>
                <TouchableOpacity
                    style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, borderWidth:1, borderColor: "#000022"  }}
                    onPress={() => this.props.history.push('/user')} >
                    <Text>Autenticar</Text>
                </TouchableOpacity>
            </View>         
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
