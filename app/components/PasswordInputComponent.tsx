/**
 * Project YooLearn
 * File PasswordInputComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 02/09/2021
 */
import React, {ReactNode, useState} from 'react';
import {
    GestureResponderEvent,
    I18nManager,
    Platform,
    StyleProp,
    TextInput as TextInputComp,
    View,
    ViewStyle,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {BaseColor, useFont, useTheme} from '../config/Theme';
import {BaseStyle} from '../config/Styles';
import {Icon} from './IconComponent';
import Text from './TextComponent';

interface TextInputComponentProps {
    style?: StyleProp<ViewStyle> | undefined;
    onChangeText?: ((event: GestureResponderEvent) => void) | undefined;
    onFocus?: any;
    renderLeft?: ReactNode;
    placeholder?: string;
    value?: string;
    success?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: string;
    multiline?: boolean;
    textAlignVertical?: string;
    error: string;
    icon?: ReactNode;
    onSubmitEditing?: ((event: GestureResponderEvent) => void) | undefined;
}

const PasswordInput = ({
                           style = {},
                           // eslint-disable-next-line @typescript-eslint/no-unused-vars
                           onChangeText = (text: any) => {
                           },
                           onFocus = () => {
                           },
                           placeholder = 'Placeholder',
                           value = '',
                           error = '',
                           success = true,
                           secureTextEntry = false,
                           keyboardType = 'default',
                           multiline = false,
                           textAlignVertical = 'center',
                           icon = null,
                           onSubmitEditing = () => {
                           },
                           ...rest
                       }: TextInputComponentProps) => {
    const {colors} = useTheme();
    const cardColor = colors.card;
    const font = useFont();
    const isDarkMode = useDarkMode();

    const [secure, setSecure] = useState(true);

    return (
        <View>
            <View
                style={[
                    BaseStyle.textInput,
                    {backgroundColor: cardColor},
                    style,
                ]}>
                {/* @ts-ignore */}
                {React.Children.map(icon, child =>
                    React.cloneElement(child, {
                        color: success ? colors.primaryLight : colors.accent,
                        style: {marginRight: Platform.OS === 'ios' ? 10 : 5}
                    }),
                )}
                <TextInputComp
                    style={{
                        fontFamily: `${font}-Regular`,
                        flex: 1,
                        height: '100%',
                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                        color: success ? colors.text : colors.accent,
                        paddingTop: 5,
                        paddingBottom: 5,
                    }}
                    keyboardAppearance={isDarkMode ? 'dark' : 'light'}
                    onChangeText={text => onChangeText(text)}
                    onFocus={() => onFocus()}
                    autoCorrect={false}
                    placeholder={placeholder}
                    placeholderTextColor={
                        success ? BaseColor.grayColor : colors.accent
                    }
                    secureTextEntry={secure}
                    value={value}
                    selectionColor={colors.primary}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    textAlignVertical={textAlignVertical}
                    onSubmitEditing={onSubmitEditing}
                    {...rest}
                />
                <Icon
                    style={{paddingRight: 5}}
                    name={!secure ? 'eye' : 'eye-slash'}
                    size={20}
                    color="gray"
                    onPress={() => setSecure(!secure)}
                />
            </View>
            {error !== '' && !success && (
                <View
                    style={{
                        alignSelf: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 5,
                    }}>
                    <Text caption2 accentColor>
                        {`${error}  `}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default PasswordInput;
