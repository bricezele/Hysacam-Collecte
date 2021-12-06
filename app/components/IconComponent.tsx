/**
 * Project YooLearn
 * File Icon
 * Path app/components/Screen
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import React from 'react';
import FontAwesome5Icon, {
    FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {I18nManager, StyleSheet} from 'react-native';

export const Icon = ({
    style,
    enableRTL,
    ...rest
}: FontAwesome5IconProps | any) => {
    const layoutStyle = enableRTL ? styles.styleRTL : {};
    return (
        <FontAwesome5Icon
            style={StyleSheet.flatten([style, layoutStyle])}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    styleRTL: {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
});
