/**
 * Project HysacamCollecte
 * File TrajetItemComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 07/12/2021
 */
import React from 'react';
import {Image, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Text from './TextComponent';
import {scaleHeight, scaleWidth} from "../utils/Tools";

interface Props {
    style?: ViewStyle;
    img?: any;
    time?: string;
    title?: string;
    color?: string;
}

const AppointmentItem = (props: Props) => {
    const {style, title, time, img, color} = props;
    return (
        <View style={[styles.appointmentItem, style]}>
            <View style={styles.content}>
                <Text maxLines={2} style={styles.txtTitle}>{title}</Text>
                <Text grayColor style={styles.txtTime}>{time}</Text>
            </View>
            <Image style={styles.imgDoctor} source={img}/>
            <View style={[styles.line, {backgroundColor: color}]}/>
        </View>
    );
};
export default AppointmentItem;

const styles = ScaledSheet.create({
    appointmentItem: {
        width: scaleWidth(327),
        height: scaleHeight(76),
        paddingVertical: scaleHeight(16),
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(16),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: scaleWidth(8),
        flexDirection: 'row',
    },
    content: {},
    txtTitle: {
        fontSize: scaleHeight(18),
        lineHeight: scaleHeight(24),
    },
    txtTime: {
        fontSize: scaleHeight(12),
        fontWeight: '500',
        lineHeight: scaleHeight(16),
        marginTop: scaleHeight(5),
    },
    imgDoctor: {
        width: scaleWidth(80),
        height: scaleWidth(44),
        overflow: 'hidden',
    },
    line: {
        position: 'absolute',
        width: scaleWidth(4),
        height: scaleHeight(44),
        borderTopRightRadius: scaleWidth(10),
        borderBottomRightRadius: scaleWidth(10),
        left: 0,
        alignSelf: 'center',
    },
});
