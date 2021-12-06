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

const MainStack = createStackNavigator();

function MainNavigator({application}) {
    console.log('Application', application);
    return (
        <MainStack.Navigator
            headerMode="none"
            initialRouteName='OnBoardingScreen'>
            <MainStack.Screen
                name="OnBoardingScreen"
                component={OnBoardingScreen}
            />
        </MainStack.Navigator>
    );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
    bindActionCreators({}, dispatch);

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
