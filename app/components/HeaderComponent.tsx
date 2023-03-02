/**
 * Project Hysacam
 * File Header
 * Path app/components
 * Created by BRICE ZELE
 * Date: 27/08/2021
 */
import React, {ReactNode, useEffect} from 'react';
import {
    GestureResponderEvent,
    StatusBar,
    StatusBarStyle,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../redux';
import Text from './TextComponent';
import {scaleHeight} from "../utils/Tools";

interface HeaderComponentProps {
    style?: StyleProp<ViewStyle> | undefined;
    styleText?: ViewStyle | TextStyle;
    styleLeft?: StyleProp<ViewStyle> | undefined;
    styleCenter?: StyleProp<ViewStyle> | undefined;
    styleRight?: StyleProp<ViewStyle> | undefined;
    styleRightSecond?: StyleProp<ViewStyle> | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    renderLeft?: ReactNode;
    renderRight?: ReactNode;
    rightNonTouchable?: boolean;
    renderRightSecond?: ReactNode;
    onPressRightSecond?: ((event: GestureResponderEvent) => void) | undefined;
    onPressLeft?: ((event: GestureResponderEvent) => void) | undefined;
    onPressRight?: ((event: GestureResponderEvent) => void) | undefined;
    title?: string;
    subTitle?: string;
    barStyle?: StatusBarStyle;
}

const Header = ({
                    style = {},
                    styleLeft = {},
                    styleCenter = {},
                    styleRight = {},
                    styleText = {},
                    styleRightSecond = {},
                    renderLeft = null,
                    renderRight = null,
                    rightNonTouchable = false,
                    renderRightSecond = null,
                    onPressLeft = () => {
                    },
                    onPressRight = () => {
                    },
                    onPressRightSecond = () => {
                    },
                    title = '',
                    subTitle = '',
                    barStyle = 'default',
                }: HeaderComponentProps) => {
    const isDarkMode = useDarkMode();
    const forceDark = useSelector(
        (state: RootReducerType) => state.application.force_dark,
    );

    useEffect(() => {
        let option: StatusBarStyle = isDarkMode
            ? 'light-content'
            : 'dark-content';
        if (forceDark) {
            option = 'light-content';
        }
        if (forceDark === false) {
            option = 'dark-content';
        }
        if (barStyle) {
            option = barStyle;
        }
        StatusBar.setBarStyle(option, true);
    }, [forceDark, isDarkMode]);

    return (
        <View style={[styles.contain, style]}>
            <View style={{flex: 1}}>
                <TouchableOpacity
                    style={[styles.contentLeft, styleLeft]}
                    onPress={onPressLeft}>
                    {renderLeft}
                </TouchableOpacity>
            </View>
            {title !== '' && (
                <View style={[styles.contentCenter, styleCenter]}>
                    <Text headline numberOfLines={1} style={styleText}>
                        {title}
                    </Text>
                    {subTitle !== '' && (
                        <Text caption2 light>
                            {subTitle}
                        </Text>
                    )}
                </View>
            )}
            <View style={styles.right}>
                <TouchableOpacity
                    style={[styles.contentRightSecond, styleRightSecond]}
                    onPress={onPressRightSecond}>
                    {renderRightSecond}
                </TouchableOpacity>
                {rightNonTouchable ? (
                    renderRight
                ) : (
                    <TouchableOpacity
                        style={[styles.contentRight, styleRight]}
                        onPress={onPressRight}>
                        {renderRight}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contain: {height: scaleHeight(50), flexDirection: 'row', marginBottom: 10},
    contentLeft: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    contentCenter: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 20,
        height: '100%',
    },
    contentRightSecond: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
    },
    right: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default Header;
