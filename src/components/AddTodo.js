import React, { Component, PropTypes } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';

export default class AddTodo extends Component {
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
                    placeholder="Add a Todo..."
                    placeholderTextColor='#e7e2d3'
                    onSubmitEditing={this.props.onSubmitEditing}
                />
                { this.props.value !== '' &&
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={this.props.onPress}>
                            <Ionicons name="md-add" size={width(9)} color="#e7b109"/>
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
        backgroundColor: '#08042f',
        marginBottom: width(2)
    },
    textInput: {
        height: height(7),
        width: width(88),
        paddingHorizontal: width(2),
        color: '#e7b109',
        backgroundColor: '#08042f',
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
    onSubmitEditing: PropTypes.func.isRequired,
};