/**
 * Project HysacamCollecte
 * File SignInScreen
 * Path app/screens
 * Created by BRICE ZELE
 * Date: 06/12/2021
 */
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image, Keyboard, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ScaledSheet} from 'react-native-size-matters';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import {Images} from "../assets/images/Images";
import Text from '../components/TextComponent';
import {getBottomSpace, getStatusBarHeight, scaleHeight, scaleWidth} from "../utils/Tools";
import {useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import PasswordInput from "../components/PasswordInputComponent";
import TextInput from '../components/TextInputComponent';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../components/ButtonComponent";
import SvgLine from "../assets/svg/SvgLine";
import {FacebookSocialButton} from "../components/FacebookSocialButtonComponent";
import {GoogleSocialButton} from "../components/GoogleSocialButtonComponent";
import SvgHuman from "../assets/svg/SvgHuman";

const {width, height} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

const SignInScreen = ({navigation}) => {

    const {colors} = useTheme();
    const {t} = useTranslation();
    const [show, setShow] = useState(true);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('email_invalid'))
            .required(t('email_required')),
        password: Yup.string()
            .required(t('password_required'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('your_password_must_match'),
            ),
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
        useFormik({
            validationSchema: LoginSchema,
            initialValues: {email: '', password: ''},
            onSubmit: values => {

            },
        });

    const onSignUp = useCallback(() => {
        //navigation.navigate(ROUTES.SignUp);
    }, [navigation]);

    const onForgotPassword = useCallback(() => {
        //navigation.navigate(ROUTES.ForgotPassword);
    }, [navigation]);

    const onCreateAccount = useCallback(() => {
        //navigation.navigate(ROUTES.CreatAccount);
    }, [navigation]);

    const onPress = useCallback(() => {
    }, []);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
        };
    }, []);

    const keyboardDidShow = () => {
        setShow(false);
    };

    const keyboardDidHide = () => {
        setShow(true);
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}>

                <View
                    style={[
                        StyleSheet.absoluteFillObject,
                        styles.circleContainer,
                    ]}>
                    <View style={styles.circle}>
                        <SvgHuman/>
                    </View>
                </View>

                <Image source={Images.logo} style={styles.logo}/>
                <Text title1 bold style={styles.txtWelcome}>{t('connexion')}</Text>

                <TextInput
                    onChangeText={handleChange('email')}
                    placeholder={t('email')}
                    value={values.email}
                    keyboardType="email-address"
                    onBlur={handleBlur('email')}
                    success={touched.email && !errors.email}
                    touched={touched.email}
                    error={errors.email}
                    autoCapitalize="none"
                    icon={<IoniconsIcons
                        name="person"
                        size={20}
                    />}
                />
                <PasswordInput
                    style={{marginTop: 10}}
                    onChangeText={handleChange('password')}
                    placeholder={t('password')}
                    secureTextEntry
                    value={values.password}
                    onBlur={handleBlur('password')}
                    success={touched.password && !errors.password}
                    touched={touched.password}
                    icon={<FontAwesome5Icon
                        name="lock"
                        size={20}
                    />}
                    error={errors.password}
                />

                <View style={styles.signInView}>
                    <Button
                        onPress={handleSubmit}
                        full
                        style={styles.signIn}>
                        {t('connect_action')}
                    </Button>
                </View>

                <TouchableOpacity
                    onPress={onForgotPassword}
                    style={styles.forgotPasswordView}>
                    <Text semibold primaryColor style={styles.txtForgotPassword}>{t('forget_password')}</Text>
                </TouchableOpacity>
                <View style={styles.lineView}>
                    <SvgLine/>
                    <Text grayColor style={styles.txtOr}>{t('or')}</Text>
                    <SvgLine/>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 25,
                        paddingHorizontal: 20,
                        width: '100%',
                    }}>
                    <FacebookSocialButton
                        buttonViewStyle={{width: '45%'}}
                        onPress={() => {
                        }}
                        buttonText={t('facebook')}
                    />

                    <GoogleSocialButton
                        buttonViewStyle={{width: '45%'}}
                        onPress={() => {
                        }}
                        buttonText={t('google')}
                    />
                </View>

            </KeyboardAwareScrollView>

            <TouchableOpacity onPress={onSignUp} style={styles.SignUpView}>
                <Text semibold primaryColor
                      style={{textTransform: 'uppercase'}}>{`${t('no_account')} ${t('create_account')}`}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignInScreen;
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        position: 'absolute',
        alignItems: 'flex-start',
        top:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(24)
                : scaleHeight(24),
        width: scaleWidth(100),
        height: scaleHeight(20),
        left: scaleWidth(20)
    },
    txtWelcome: {
        lineHeight: scaleHeight(48),
        marginTop:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(60)
                : scaleHeight(60),
        marginLeft: scaleWidth(40),
        marginBottom: scaleHeight(30),
    },
    signInView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: scaleHeight(20),
    },
    signIn: {
        width: scaleWidth(221),
        height: scaleHeight(48),
    },
    forgotPasswordView: {
        marginTop: scaleHeight(20),
        alignSelf: 'center',
        width: scaleWidth(200),
        height: scaleHeight(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtForgotPassword: {
        /*fontFamily: FONTS.HIND.SemiBold,
        color: colors.classicBlue,
        fontWeight: '600',*/
        fontSize: scaleHeight(12),
        textTransform: 'uppercase',
    },
    txtOr: {
        /*fontFamily: FONTS.HIND.Regular,
        color: colors.dimGray,*/
        fontSize: scaleHeight(16),
    },
    lineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scaleWidth(40),
        alignItems: 'center',
        marginTop: scaleHeight(25),
    },
    SignUpView: {
        position: 'absolute',
        alignSelf: 'center',
        width: scaleWidth(200),
        height: scaleHeight(30),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: getBottomSpace() + scaleHeight(8),
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE * 0.9,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '15%',
    },
    circleContainer: {
        alignItems: 'flex-end',
        right: -scaleWidth(CIRCLE_SIZE / 2) + scaleWidth(20),
        top: -scaleWidth(CIRCLE_SIZE / 5),
    },
});


