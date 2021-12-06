/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {ActivityIndicator, LogBox, View,} from 'react-native';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import {BaseColor} from "./config/Theme";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {QueryClient, QueryClientProvider} from "react-query";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from "./navigation/RootNavigator";

const App: () => Node = () => {

    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();

    // OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Config.ONESIGNAL_ID);
    // END OneSignal Init Code

    // Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
        // console.log('Prompt response:', response);
    });

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
    });

    const renderActivityIndicator = () => (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={BaseColor.whiteColor}/>
        </View>
    );

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnmount: false,
                refetchOnReconnect: false,
                retry: false,
                staleTime: 5 * 60 * 1000,
            },
        },
    });

    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={renderActivityIndicator()}>
                <QueryClientProvider client={queryClient}>
                    <SafeAreaProvider>
                        <RootNavigator/>
                    </SafeAreaProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
