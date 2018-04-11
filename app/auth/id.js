import React, { Component } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types'
import FingerprintScanner from 'react-native-fingerprint-scanner';

import ShakingText from './ShakingText.component';
import styles from './FingerprintPopup.component.styles';

class FingerprintPopup extends Component {

    constructor(props) {
        super(props);
        this.state = { errorMessage: undefined };
    }

    goBack(){
        this.props.history.goBack()
    }
    
    componentDidMount() {
        FingerprintScanner
        .authenticate({ onAttempt: this.handleAuthenticationAttempted })
        .then(() => {
            this.props.handlePopupDismissed();
        })
        .catch((error) => {
            this.setState({ errorMessage: error.message });
            this.description.shake();
        });
    }
    
    componentWillUnmount() {
        FingerprintScanner.release();
    }
    
    handleAuthenticationAttempted = (error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
    };
    
    render() {
        const { errorMessage } = this.state;
        const { style } = this.props;
    
        return (
        <View style={styles.container}>
            <View style={[styles.contentContainer, style]}>
    
            <Image
                style={styles.logo}
                source={require('./assets/finger_print.png')}
            />
    
            <Text style={styles.heading}>
                Autenticação{'\n'}com Digital 
            </Text>
            <ShakingText
                ref={(instance) => { this.description = instance; }}
                style={styles.description(!!errorMessage)}>
                {errorMessage || 'Escaneie sua digital\npara autenticar e continuar'}
            </ShakingText>
    
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.goBack()}
            >
                <Text style={styles.buttonText}>
                VOLTAR AO INICIO
                </Text>
            </TouchableOpacity>
    
            </View>
        </View>
        );
    }
}
    
FingerprintPopup.propTypes = {
    style: ViewPropTypes.style,
    handlePopupDismissed: PropTypes.func.isRequired,
};

export default FingerprintPopup;