/**
 * Project Hysacam
 * File ImageComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 27/08/2021
 */
import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface ImageComponentProps {
    style?: StyleProp<ViewStyle> | undefined;
    source: string;
    resizeMode?: string;
}

const Image = ({
    style = {},
    resizeMode = 'cover',
    ...rest
}: ImageComponentProps) => {
    let resize: any = FastImage.resizeMode.cover;
    switch (resizeMode) {
        case 'contain':
            resize = FastImage.resizeMode.contain;
            break;
        case 'stretch':
            resize = FastImage.resizeMode.stretch;
            break;
        case 'center':
            resize = FastImage.resizeMode.center;
            break;
        default:
            break;
    }

    return (
        <FastImage
            style={StyleSheet.flatten([style && style])}
            {...rest}
            resizeMode={resize}
        />
    );
};

export default Image;
