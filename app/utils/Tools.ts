/**
 * Project YooLearn
 * File index
 * Path app/utils
 * Created by BRICE ZELE
 * Date: 27/08/2021
 */
import {
    Dimensions,
    I18nManager,
    LayoutAnimation,
    PermissionsAndroid,
    PixelRatio,
    Platform,
    StatusBar,
    UIManager,
} from 'react-native';
import { scale } from 'react-native-size-matters';

const scaleValue = PixelRatio.get() / 2;

export const enableExperimental = () => {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size: any, limitScale = 1.2) => {
    /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
    const value = scaleValue > limitScale ? limitScale : scaleValue;
    return size * value;
};

export const heightHeader = () => {
    const {width} = Dimensions.get('window');
    const {height} = Dimensions.get('window');
    const landscape = width > height;

    if (Platform.OS === 'android') return 45;
    // if (Platform.isPad) return 65;
    switch (height) {
        case 375:
        case 414:
        case 812:
        case 896:
            return landscape ? 45 : 88;
        default:
            return landscape ? 45 : 65;
    }
};

export const heightTabView = () => {
    const {height} = Dimensions.get('window');
    let size = height - heightHeader();
    switch (height) {
        case 375:
        case 414:
        case 812:
        case 896:
            size -= 30;
            break;
        default:
            break;
    }

    return size;
};

export const getWidthDevice = () => Dimensions.get('window').width;

export const getHeightDevice = () => Dimensions.get('window').height;

export const scrollEnabled = (contentWidth: any, contentHeight: any) =>
    contentHeight > Dimensions.get('window').height - heightHeader();

export const languageFromCode = (code: any) => {
    switch (code) {
        case 'de':
            return 'Allemand';
        case 'en':
            return 'Anglais';
        case 'es':
            return 'Espagnol';
        case 'fr':
            return 'Français';
        default:
            return 'Unknown';
    }
};

export const isLanguageRTL = (code: any) => {
    switch (code) {
        case 'ar':
        case 'he':
            return true;
        default:
            return false;
    }
};

export const reloadLocale = (oldLanguage: any, newLanguage: any) => {
    const oldStyle = isLanguageRTL(oldLanguage);
    const newStyle = isLanguageRTL(newLanguage);
    if (oldStyle != newStyle) {
        I18nManager.forceRTL(newStyle);
        // RNRestart.Restart();
    }
};
export const requestLocationPermission = async () =>
    new Promise(async (resolve, reject) => {
        try {
            const grantedPermissionFineLocation =
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Autorisation',
                        message: "YooLearn a besoin d'accéder à votre position",
                        buttonNeutral: 'Me le rappeler plus tard',
                        buttonNegative: 'Annuler',
                        buttonPositive: 'OK',
                    },
                );

            const grantedPermissionCoarseLocation =
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    {
                        title: 'Autorisation',
                        message: "YooLearn a besoin d'accéder à votre position",
                        buttonNeutral: 'Me le rappeler plus tard',
                        buttonNegative: 'Annuler',
                        buttonPositive: 'OK',
                    },
                );
            resolve(
                grantedPermissionCoarseLocation ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissionFineLocation ===
                        PermissionsAndroid.RESULTS.GRANTED,
            );
        } catch (error) {
            reject(false);
        }
    });

export const checkEmail = (email: string) => {
    const reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === '') return false;
    return reg.test(email);
};

export const validatePassword = (password: string) => {
    // Do not show anything when the length of password is zero.
    if (password.length < 3) return false;

    // Create an array and push all possible values that you want in password
    const matchedCase = [];
    matchedCase.push('[$@$!%*#?&]'); // Special Charector
    matchedCase.push('[A-Z]'); // Uppercase Alpabates
    matchedCase.push('[0-9]'); // Numbers
    matchedCase.push('[a-z]'); // Lowercase Alphabates

    // Check the conditions
    let ctr = 0;
    for (let i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            ctr++;
        }
    }
    switch (ctr) {
        case 3:
            return true;
            break;
        default:
            return false;
            break;
    }
};

export const fileBaseName = (filename: string) =>
    filename.split('.').slice(0, -1).join('.');

export const getErrorMsg = (error: any) =>
    error.error?.message?.hasOwnProperty('message')
        ? Array.isArray(error.error?.message?.message)
            ? error.error?.message?.message.join('\n')
            : error.error?.message?.message
        : error.error?.message;

export const isIphoneX = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    );
};

export const ifIphoneX = (iphoneXStyle, regularStyle) => {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
};

export const getStatusBarHeight = (safe = null) =>
    Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight,
        default: 0,
    });

export const getBottomSpace = () => (isIphoneX() ? 34 : 0);

const { height } = Dimensions.get('window');

const widthDesign = 375;
const heightDesign = 812 - getStatusBarHeight(); // 44

const widthScale = 350;
const heightScale = 680;

export const getHeightByPercent = (percent) => {
    if (percent > 100) {
        return height;
    }
    if (percent < 0) {
        return 0;
    }
    return (percent * height) / 100;
};

export const scaleWidth = (number) => {
    return scale((number / widthDesign) * widthScale);
};

export const scaleHeight = (number) => {
    return scale((number / heightDesign) * heightScale);
};
