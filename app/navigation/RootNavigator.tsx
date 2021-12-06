/**
 * Project HysacamCollecte
 * File RootNavigator
 * Path app/navigation
 * Created by BRICE ZELE
 * Date: 05/12/2021
 */
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {Platform, StatusBar} from 'react-native';
import {ColorSchemeProvider, useDarkMode} from 'react-native-dynamic';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BaseSettings} from '../config/Settings';
import MainNavigator from './MainNavigator';
import {RootReducerType} from '../redux';
import {useTheme} from '../config/Theme';

const RootStack = createStackNavigator();

function RootNavigator() {
    const storeLanguage = useSelector(
        (state: RootReducerType) => state.application.language,
    );
    const showConfetti = useSelector(
        (state: RootReducerType) => state.application.showConfetti,
    );
    const {theme, colors} = useTheme();
    const isDarkMode = useDarkMode();

    const forFade = ({current, closing}: any) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    useEffect(() => {
        i18n.use(initReactI18next).init({
            resources: BaseSettings.resourcesLanguage,
            lng: storeLanguage ?? BaseSettings.defaultLanguage,
            fallbackLng: BaseSettings.defaultLanguage,
        });
        if (Platform.OS === 'android')
            StatusBar.setBackgroundColor(colors.primary, true);
        StatusBar.setBarStyle(
            isDarkMode ? 'light-content' : 'dark-content',
            true,
        );
        RNBootSplash.hide({fade: true});
    }, []);

    return (
        <ColorSchemeProvider>
            <NavigationContainer theme={theme}>
                <RootStack.Navigator
                    mode="modal"
                    headerMode="none"
                    initialRouteName="Main">
                    <RootStack.Screen name="Main" component={MainNavigator}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </ColorSchemeProvider>
    );
}

export default RootNavigator;
