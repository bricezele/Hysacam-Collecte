/**
 * Project Hysacam
 * File GoogleSocialButtonComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 23/09/2021
 */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Images} from "../assets/images/Images";

const styles = StyleSheet.create({
    googleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
    },
    imageIconStyle: {
        padding: 10,
        marginLeft: 15,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    textStyle: {
        color: '#575757',
        marginLeft: 15,
        marginRight: 20,
    },
});

export class GoogleSocialButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={{...styles.googleStyle, ...this.props.buttonViewStyle}}
                onPress={this.props.onPress}>
                <Image
                    source={Images.google}
                    style={{...styles.imageIconStyle, ...this.props.logoStyle}}
                />
                <Text style={{...styles.textStyle, ...this.props.textStyle}}>
                    {this.props.buttonText
                        ? this.props.buttonText
                        : 'Sign in with Google'}
                </Text>
            </TouchableOpacity>
        );
    }
}
