/**
 * Project YooLearn
 * File Button
 * Path app/components
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import React, {ReactNode} from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {BaseColor, useTheme} from '../config/Theme';
import {FontWeight, Typography} from '../config/Typography';
import Text from './TextComponent';
import {scaleHeight} from "../utils/Tools";

interface ButtonComponentProps {
    icon?: ReactNode;
    outline?: boolean;
    full?: boolean;
    round?: boolean;
    loading?: boolean;
    children?: ReactNode;
    style?: StyleProp<ViewStyle> | undefined;
    styleText?: ViewStyle | TextStyle;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = ({
                    style = {},
                    styleText = {},
                    icon = null,
                    outline = false,
                    full = false,
                    round = false,
                    loading = false,
                    children = '',
                    onPress = () => {
                    },
                    ...rest
                }: ButtonComponentProps) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity
            {...rest}
            style={StyleSheet.flatten([
                [styles.default, {backgroundColor: colors.primary}],
                outline && [
                    styles.outline,
                    {backgroundColor: colors.card, borderColor: colors.primary},
                ],
                full && styles.full,
                round && styles.round,
                style,
            ])}
            onPress={onPress}
            activeOpacity={0.9}>
            <Text
                style={StyleSheet.flatten([
                    styles.textDefault,
                    outline && {color: colors.primary},
                    styleText,
                ])}
                numberOfLines={1}>
                {children || 'Button'}
            </Text>
            {icon && <View style={{marginLeft: 7}}>{icon || null}</View>}
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={outline ? colors.primary : BaseColor.whiteColor}
                    style={{paddingLeft: 5}}
                />
            ) : null}
        </TouchableOpacity>
    );
};
export default Button;

const styles = StyleSheet.create({
    default: {
        height: scaleHeight(48),
        borderRadius: scaleHeight(24),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textDefault: {
        ...Typography.headline,
        color: BaseColor.whiteColor,
        fontWeight: FontWeight.semibold,
        textTransform: 'uppercase',
    },
    outline: {
        borderWidth: 1,
    },
    full: {
        width: '100%',
        alignSelf: 'auto',
    },
    round: {
        borderRadius: 28,
    },
});
