import React, { Component, PropTypes } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { width, height } from '../utils';

export default class AddTodo extends Component {
    constructor() {
        super();

    }

    changeWidthTextInput() {
        if (this.props.value !== '') {
            return styles.textInput;
        }

        return [styles.textInput, styles.textInputActive];
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                />
                { this.props.value !== '' &&
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Ionicons name="md-add" size={width * 0.09} color="gray"/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        marginBottom: width * 0.01
    },
    textInput: {
        height: 40,
        width: width * 0.88,
        paddingHorizontal: width * 0.02,
        backgroundColor: '#ccc',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

AddTodo.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};