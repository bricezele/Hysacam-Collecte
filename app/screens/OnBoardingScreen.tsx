/**
 * Project HysacamCollecte
 * File OnBoardingScreen
 * Path app/screens
 * Created by BRICE ZELE
 * Date: 05/12/2021
 */
import React, {useCallback, useState} from 'react';
import {Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Text from '../components/TextComponent';
import {ScreenComponent} from "../components/ScreenComponent";
import LottieView from 'lottie-react-native';
import {getBottomSpace, getStatusBarHeight, scaleHeight, scaleWidth} from "../utils/Tools";
import AppIntroSlider from "react-native-app-intro-slider";
import {Animations} from "../assets/Animations/Animations";
import {BaseColor, useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import {Images} from "../assets/images/Images";

const {width, height} = Dimensions.get('screen');
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;


const OnBoardingScreen = () => {


    const [id, setId] = useState(0);
    const {navigate} = useNavigation();
    const {colors} = useTheme();
    const {t} = useTranslation();

    const DATA = [
        {
            id: '0',
            animationUri: Animations.trashClean,
            txtTitle: t('walkthrough_title_1'),
            description: t('walkthrough_description_1'),
        },
        {
            id: '1',
            animationUri: Animations.guyUseTrash,
            txtTitle: t('walkthrough_title_2'),
            description: t('walkthrough_description_2'),
        },
        {
            id: '2',
            animationUri: Animations.event,
            txtTitle: t('walkthrough_title_3'),
            description: t('walkthrough_description_3'),
        },
        {
            id: '2',
            animationUri: Animations.notifications,
            txtTitle: t('walkthrough_title_4'),
            description: t('walkthrough_description_4'),
        }
    ];

    const renderDoneButton = useCallback(() => {
        return (
            <View style={[styles.doneButton, {backgroundColor: colors.primary}]}>
                <Text bold style={[styles.txtGetStarted, {
                    color: BaseColor.whiteColor,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }]}>{t('get_started')}</Text>
            </View>
        );
    }, []);

    const renderItem = useCallback(({item}) => {

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <LottieView source={item.animationUri} autoPlay loop/>
                </View>
                <View style={styles.bottomContent}>
                    <Text bold title2 primaryColor style={styles.txtTitle}>{item.txtTitle}</Text>
                    <Text grayColor body1 semibold style={styles.txtDescription}>{item.description}</Text>
                </View>
            </View>
        )
    }, []);

    return (
        <ScreenComponent>
            <Image source={Images.logo} style={styles.logo}/>
            <AppIntroSlider
                key={id}
                data={DATA}
                renderItem={renderItem}
                showPrevButton={false}
                showNextButton={false}
                showDoneButton={true}
                renderDoneButton={renderDoneButton}
                onDone={() => {
                }}
                dotStyle={[styles.dotStyle, {
                    backgroundColor: colors.card
                }]}
                activeDotStyle={[styles.activeDotStyle, {backgroundColor: colors.primary}]}
            />
            <TouchableOpacity onPress={() => {
            }} style={styles.skipView}>
                <Text caption2 style={[styles.txtSkip, {color: colors.primary}]}>{t('skip')}</Text>
            </TouchableOpacity>
        </ScreenComponent>
    );

}

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    svg: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    txtTitle: {
        textAlign: 'center',
        marginTop: scaleHeight(24),
        lineHeight: scaleHeight(32),
    },
    txtDescription: {
        lineHeight: scaleHeight(24),
        textAlign: 'center',
        marginTop: scaleHeight(14),
    },
    content: {
        width: '50%',
        alignItems: 'center',
        height: '50%',
        width: widthScreen,
    },
    bottomContent: {
        marginTop: scaleHeight(52),
    },
    dotStyle: {
        width: scaleWidth(8),
        height: scaleWidth(4),
        marginBottom: heightScreen * 0.75,
    },
    activeDotStyle: {
        width: scaleWidth(20),
        height: scaleHeight(4),
        marginBottom: heightScreen * 0.75,
    },
    txtSkip: {
        textTransform: 'uppercase',
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
    skipView: {
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
        right: scaleWidth(24),
        top:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(12)
                : scaleHeight(12),
        width: scaleWidth(48),
        height: scaleHeight(48),
    },
    doneButton: {
        width: scaleWidth(160),
        height: scaleWidth(48),
        borderRadius: scaleWidth(24),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: getBottomSpace(),
        right: "60%"
    },
    txtGetStarted: {
        fontSize: scaleHeight(16),
        lineHeight: scaleHeight(26),
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});
