import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types'
import FingerprintScanner from 'react-native-fingerprint-scanner';

class FingerprintPopup extends Component {

    // Iniciamos o componente com a mensagem de erro indefinida
    state = { errorMessage: undefined }    
    
    /**
     * Esta função ativa um Listener no Leitor de digital
     * Se o leitor confirmar que o usuário é ativo, a função 
     * this.props.handlePopupDismissed é ativada e remove a página da tela
     * Se não, o motivo de erro é carregado no estado do componente e mostrado
     * na parte de mensagem do componente
     */
    componentDidMount() {
        FingerprintScanner
        .authenticate({ onAttempt: this.handleAuthenticationAttempted })
        .then(() => this.props.handlePopupDismissed() )
        .catch(this.handleAuthenticationAttempted);
    }

    // Função para retornar a rota inicial
    goBack = () => this.props.history.goBack()
    // Função para remover o componente da tela, quando ele for desmontado    
    componentWillUnmount = () => FingerprintScanner.release()    
    // Se a autenticação falhar ou o aplicativo não possuir leitor, 
    // um erro será emitido e carregado na mensagem do componente para alertar o usuario
    handleAuthenticationAttempted = (error) => this.setState({ errorMessage: error.message });
    
    render() {
        const { errorMessage } = this.state;
        const { style } = this.props;
    
        return (
            <View style={styles.container}>
                <View style={[styles.contentContainer, style]}>    
                    {/* Fazemos o carregamento da imagem da digital (link abaixo) */}
                    <Image style={styles.logo}
                        source={require('./finger_print.png')} />    
                    <Text style={styles.heading}>
                        Autenticação{'\n'}com Digital 
                    </Text>
                    {/* Aqui é mostrado o aviso para o usuario e as instruções de uso */}
                    <Text style={[
                        styles.description, 
                        { color: (this.state.errorMessage) ? '#ea3d13' : '#a5a5a5' }
                        ]}>
                        {errorMessage || 'Escaneie sua digital\npara autenticar e continuar'}
                    </Text>  
                    {/* Este botão redireciona o cliente para a tela anterior */}  
                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={() => this.goBack()} >
                        <Text style={styles.buttonText}>VOLTAR AO INICIO</Text>
                    </TouchableOpacity>    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 164, 222, 0.9)',
        backgroundColor: "#ffffff",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        marginVertical: 45,
    },
    heading: {
        textAlign: 'center',
        color: '#00a4de',
        fontSize: 21,
    },
    description: {
        textAlign: 'center',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    buttonContainer: {
        padding: 20,
    },
    buttonText: {
        color: '#8fbc5a',
        fontSize: 15,
        fontWeight: 'bold',
    }
})
    
FingerprintPopup.propTypes = {
    style: ViewPropTypes.style,
    handlePopupDismissed: PropTypes.func.isRequired,
};

export default FingerprintPopup;