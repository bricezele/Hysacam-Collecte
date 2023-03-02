/**
 * Project HysacamCollecte
 * File MainNavigator
 * Path app/navigation
 * Created by BRICE ZELE
 * Date: 05/12/2021
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import {selectAppConfig} from '../redux/config/config.selector';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import HomeScreen from "../screens/HomeScreen";
import {selectUser} from "../redux/auth/oauth.selector";
import TrajetPlanningScreen from "../screens/TrajetPlanningScreen";

const MainStack = createStackNavigator();

function MainNavigator({application, user}) {
    console.log('Application', application);
    console.log('User', user);
    return (
        <MainStack.Navigator
            headerMode="none"
            initialRouteName={'SignInScreen'}>
            <MainStack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
            />
            <MainStack.Screen
                name="OnBoardingScreen"
                component={OnBoardingScreen}
            />
            <MainStack.Screen
                name="SignInScreen"
                component={SignInScreen}
            />
            <MainStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
            />
            <MainStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <MainStack.Screen
                name="TrajetPlanningScreen"
                component={TrajetPlanningScreen}
            />

        </MainStack.Navigator>
    );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
    bindActionCreators({}, dispatch);

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    user: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
