/**
 * Project HysacamCollecte
 * File SignUpScreen
 * Path app/screens
 * Created by BRICE ZELE
 * Date: 06/12/2021
 */
import React, {useEffect, useRef, useState} from 'react';
import {ScreenComponent} from "../components/ScreenComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ScaledSheet} from "react-native-size-matters";
import {Dimensions, Image, Platform, View} from "react-native";
import * as Utils from "../utils/Tools";
import {getBottomSpace, getStatusBarHeight, scaleHeight, scaleWidth} from "../utils/Tools";
import {Images} from "../assets/images/Images";
import Text from '../components/TextComponent';
import {BaseColor, useFont, useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import SvgHuman from "../assets/svg/SvgHuman";
import * as Yup from "yup";
import {useFormik} from "formik";
import TextInput from "../components/TextInputComponent";
import IoniconsIcons from "react-native-vector-icons/Ionicons";
import Zocial from "react-native-vector-icons/Zocial";
import PasswordInput from "../components/PasswordInputComponent";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../components/ButtonComponent";
import SvgLine from "../assets/svg/SvgLine";
import {FacebookSocialButton} from "../components/FacebookSocialButtonComponent";
import {GoogleSocialButton} from "../components/GoogleSocialButtonComponent";
import PhoneInput from "react-native-phone-number-input";
import {RootReducerType} from "../redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {createStructuredSelector} from "reselect";
import {fetchSignUp, fetchSignUpReset} from "../redux/user/user.action";
import DropdownAlert from "react-native-dropdownalert";
import {selectSignUp} from "../redux/user/user.selector";
import {Routes} from "../utils/Routes";
import Snackbar from "react-native-snackbar";
import OneSignal from "react-native-onesignal";

const {width, height} = Dimensions.get('window');


const SignUpScreen = ({navigation, signup, fetchSignUp}) => {

    const {colors} = useTheme();
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    let dropDownAlertRef: any = null;

    const phoneInput = useRef<PhoneInput>(null);
    const cardColor = colors.card;
    const font = useFont();
    const backgroundColor = colors.background;
    const forceDark = useSelector(
        (state: RootReducerType) => state.application.force_dark,
    );

    const [phone, setPhone] = useState('');
    const [onesignalPlayerId, setOnesignalPlayerId] = useState('');

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required(t('field_required')),
        phone: Yup.string().nullable(true),
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
            validationSchema: RegisterSchema,
            initialValues: {email: '', password: '', name: ''},
            onSubmit: values => {
                fetchSignUp({
                    name: values.name,
                    email: values.email,
                    phone: phone,
                    password: values.password,
                    player_id: onesignalPlayerId
                })
            },
        });


    useEffect(async () => {
        dispatch(fetchSignUpReset());
        const deviceState = await OneSignal.getDeviceState();
        setOnesignalPlayerId(deviceState.userId);

    }, []);

    useEffect(() => {
        if (signup.result !== null) {
            navigation.navigate(Routes.SignInScreen);
            Snackbar.show({
                text: t('your_account_has_been_activated_you_can_now_sign_in'),
                duration: Snackbar.LENGTH_LONG,
            });
            dispatch(fetchSignUpReset());
        }
        if (signup.error) {
            dropDownAlertRef.alertWithType(
                'error',
                t('error'),
                Utils.getErrorMsg(signup),
            );
            dispatch(fetchSignUpReset());
        }
    }, [signup]);

    return (
        <ScreenComponent>
            <DropdownAlert ref={ref => (dropDownAlertRef = ref)}/>
            <View style={[styles.container, {backgroundColor: colors.primary}]}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.contentContainerStyle}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image source={Images.logoWhite} style={styles.logo}/>
                        <SvgHuman style={styles.svg}/>
                    </View>


                    <View style={[styles.contentView, {backgroundColor: colors.background}]}>
                        <Text semibold style={[styles.txtJoin, {color: colors.primary}]}>{t('create_account')}</Text>
                        <Text grayColor style={styles.txtVacation}>{t('fill_form_to_sign_up')}</Text>

                        <View style={styles.content}>
                            <TextInput
                                onChangeText={handleChange('name')}
                                placeholder={t('names_surnames')}
                                value={values.name}
                                style={{width: "100%"}}
                                onBlur={handleBlur('name')}
                                success={touched.name && !errors.name}
                                touched={touched.name}
                                error={errors.name}
                                icon={<IoniconsIcons
                                    name="person"
                                    size={20}
                                />}
                            />
                            <TextInput
                                onChangeText={handleChange('email')}
                                placeholder={t('email')}
                                value={values.email}
                                style={{width: "100%", marginTop: 10}}
                                keyboardType="email-address"
                                onBlur={handleBlur('email')}
                                success={touched.email && !errors.email}
                                touched={touched.email}
                                error={errors.email}
                                autoCapitalize="none"
                                icon={<Zocial
                                    name="email"
                                    size={20}
                                />}
                            />
                            <View style={{marginTop: 10}}>
                                <PhoneInput
                                    ref={phoneInput}
                                    containerStyle={{
                                        width: '100%',
                                        backgroundColor: cardColor,
                                        borderRadius: scaleHeight(24),
                                    }}
                                    textContainerStyle={{
                                        backgroundColor: cardColor,
                                        borderRadius: 5,
                                        borderRadius: scaleHeight(24),
                                    }}
                                    textInputStyle={{
                                        color: colors.text,
                                        fontFamily: `${font}-Regular`,
                                        padding: 0,
                                        fontSize: 15,
                                    }}
                                    codeTextStyle={{
                                        color: colors.text,
                                        fontFamily: `${font}-Regular`,
                                    }}
                                    flagButtonStyle={{color: colors.text}}
                                    defaultCode="CM"
                                    placeholder={t('phone_number')}
                                    onChangeFormattedText={text => {
                                        setPhone(text);
                                    }}
                                    withDarkTheme={forceDark}
                                    textInputProps={{
                                        placeholderTextColor: BaseColor.grayColor,
                                    }}
                                />
                                {phone !== '' &&
                                !phoneInput.current?.isValidNumber(phone) && (
                                    <View
                                        style={{
                                            alignSelf: 'flex-start',
                                            justifyContent: 'flex-start',
                                            marginTop: 5,
                                        }}>
                                        <Text caption2 accentColor>
                                            {t('invalid_phone_number')}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <PasswordInput
                                style={{marginTop: 10, width: "100%"}}
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

                            <View style={styles.signUpView}>
                                <Button
                                    loading={signup.loading}
                                    onPress={handleSubmit}
                                    full>
                                    {t('create_my_account')}
                                </Button>
                            </View>

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
                        </View>

                    </View>

                </KeyboardAwareScrollView>
            </View>
        </ScreenComponent>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    logo: {
        alignSelf: 'flex-start',
        top:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(14)
                : scaleHeight(14),
        left: scaleWidth(32),
        width: scaleWidth(100),
        height: scaleHeight(20)
    },
    content: {
        flex: 1,
        marginTop: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingRight: 20
    },
    contentView: {
        //backgroundColor: colors.white,
        borderTopRightRadius: scaleWidth(24),
        borderTopLeftRadius: scaleWidth(24),
        marginTop: scaleHeight(50),
        height: height
    },
    txtJoin: {
        /*fontFamily: FONTS.HIND.SemiBold,
        fontWeight: '600',
        color: colors.bluePrimary,*/
        fontSize: scaleHeight(24),
        lineHeight: scaleHeight(32),
        marginLeft: scaleWidth(40),
        marginTop: scaleHeight(29),

    },
    txtVacation: {
        /*fontFamily: FONTS.HIND.Regular,
        color: colors.semiBlack,*/
        fontSize: scaleHeight(18),
        lineHeight: scaleHeight(24),
        marginLeft: scaleWidth(31),
        marginTop: scaleHeight(4),
    },
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + scaleHeight(24),
    },
    svg: {
        alignSelf: 'flex-end',
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : scaleHeight(0),
        marginBottom: scaleHeight(-3),
    },
    signUpView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: scaleHeight(20),
    },
    lineView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: scaleWidth(40),
        alignItems: 'center',
        marginTop: scaleHeight(25),
    },
});

const mapStateToProps = createStructuredSelector({
    signup: selectSignUp,
});

export default connect(mapStateToProps, {
    fetchSignUp,
})(SignUpScreen);
