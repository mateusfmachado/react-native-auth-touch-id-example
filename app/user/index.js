import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RequireId from '../auth/id';

/*
    Esta rota precisa ser autenticada antes de ser mostrada.
    A autenticação por Digital está sendo utilizada como uma layer acima, 
    o que não é muito recomendado, o interessante é você não permitir o acesso
    a renderização do componente.

    Antes de renderizar o componente, se não estiver autenticado, é renderizado
    uma requisição de autenticação com Digitais. Confirmando a digital, o estado do 
    componente muda e renderiza normalmente
*/

export default class User extends Component {

    state = { auth: false }

    render() {
        if( !this.state.auth ) return (<RequireId history={this.props.history} handlePopupDismissed={() => this.setState({auth: true})} />)
        return (
            <View style={styles.container}>
                <Text>AUTENTICADO</Text>
                <TouchableOpacity
                    style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, borderWidth:1, borderColor: "#000022"  }}
                    onPress={() => this.props.history.goBack()} >
                    <Text>Voltar</Text>
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
