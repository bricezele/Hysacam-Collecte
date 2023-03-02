/**
 * Project HysacamCollecte
 * File AvatarComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 06/12/2021
 */
import React from 'react';
import {useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";
import Text from './TextComponent';

const Avatar = ({onPress, image, name, subName}) => {

    const {colors} = useTheme();
    const {t} = useTranslation();
    const {width, height} = Dimensions.get('window');
    const dispatch = useDispatch();

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={onPress}
            activeOpacity={0.9}>
            <Image source={image} style={[styles.thumb]}/>
            <View style={{flex: 1, alignItems: 'flex-start', marginRight: 2}}>
                <Text overline numberOfLines={1}>
                    {name}
                </Text>
                <Text
                    style={{marginBottom: 0}}
                    bold
                    caption1
                    numberOfLines={1}
                    primaryColor>
                    {subName}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
});

export default Avatar
