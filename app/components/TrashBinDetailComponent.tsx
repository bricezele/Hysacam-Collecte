/**
 * Project HysacamCollecte
 * File TrashBinDetailComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 07/12/2021
 */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from "./IconComponent";
import {useTranslation} from "react-i18next";
import {useFont, useTheme} from "../config/Theme";
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux";
import {TrashBinState} from "../enum/TrashBinState";
import Image from './ImageComponent';
import Text from './TextComponent';

export default function TrashBinDetailComponent(props) {
    const {style, image, styleThumb, onPress, name, state, position} = props;
    const {t} = useTranslation();
    const {colors} = useTheme();
    const font = useFont();
    const forceDark = useSelector(
        (state: RootReducerType) => state.application.force_dark,
    );
    let color = '#28a745';
    switch (state) {
        case TrashBinState.EMPTY:
            color = '#28a745'
            break;
        case TrashBinState.MIDDLE_FULL:
            color = '#007bff'
            break;
        case TrashBinState.FULL:
            color = '#ffc107'
            break;
        case TrashBinState.OVERFLOW:
            color = '#dc3545'
            break;
        default:
            color = '#28a745'

    }

    return (
        <TouchableOpacity
            style={[styles.contain, style]}
            onPress={onPress}
            activeOpacity={0.9}>
            <Image source={image} style={[styles.thumb, styleThumb]}/>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text headline semibold numberOfLines={1}>
                    {name}
                </Text>
                <Text
                    body2
                    style={{marginTop: 3, marginBottom: 3, color}}
                    numberOfLines={1}>
                    {t(state)}
                </Text>
                <View style={styles.location}>
                    <Icon name="map-marker-alt" size={10} color={colors.primary}/>
                    <Text
                        caption1
                        primaryColor
                        style={{
                            marginLeft: 3,
                        }}>
                        {position}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contain: {
        flexDirection: "row",
        alignItems: "center"
    },
    thumb: {
        width: 50,
        height: 70,
        borderRadius: 40,
        marginRight: 10
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
});

TrashBinDetailComponent.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    state: PropTypes.string,
    position: PropTypes.string,
    styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
};

TrashBinDetailComponent.defaultProps = {
    image: '',
    name: '',
    state: TrashBinState.EMPTY,
    position: '',
    styleThumb: {},
    onPress: () => {
    },
    style: {},
};
