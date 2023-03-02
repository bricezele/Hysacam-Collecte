/**
 * Project HysacamCollecte
 * File BottomTab
 * Path app/navigation
 * Created by BRICE ZELE
 * Date: 06/12/2021
 */
import React, {useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {AnyAction, bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {connect, useSelector} from 'react-redux';
import {Dimensions, Platform, StyleSheet, TouchableOpacity,} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {useNavigation} from '@react-navigation/native';
import {MultiBarButton, MultiBarProvider,} from '../components/react-native-multibar/src/index';
import {BaseColor, useFont, useTheme} from '../config/Theme';
import {Icon} from '../components/IconComponent';
import HomeScreen from '../screens/HomeScreen';
import {RootReducerType} from '../redux';
import {TouchIcon} from '../components/TouchIconComponent';
import TrajetPlanningScreen from "../screens/TrajetPlanningScreen";

const THEME_ITEM_SIZE = 60;
const {width} = Dimensions.get('window');

function BottomTabNavigator({}) {
    const BottomTab = React.useRef<ReturnType<typeof createBottomTabNavigator>>(
        createBottomTabNavigator(),
    ).current;

    const {t} = useTranslation();
    const {colors} = useTheme();
    const font = useFont();
    const forceDark = useSelector(
        (state: RootReducerType) => state.application.force_dark,
    );
    const navigation = useNavigation();
    const ref = useRef();

    const [icons] = useState([
        {
            icon: 'calendar-alt',
            name: 'workshops',
            route: 'AddWorkshopScreen',
        },
        {
            icon: 'users',
            name: 'bookings',
            route: '',
        },
        {
            icon: 'comments',
            name: 'messages',
            route: '',
        },
        {
            icon: 'user',
            name: 'my_profil',
            route: 'ProfileScreen',
        },
    ]);

    const renderIcon = (routeName: string, selectTab: string) => {
        let icon = '';

        switch (routeName) {
            case 'HomeScreen':
                icon = 'home';
                break;
            case 'EventScreen':
                icon = 'calendar-alt';
                break;
            case 'BookingScreen':
                icon = 'users';
                break;
            case 'MessageScreen':
                icon = 'comments';
                break;
        }

        return (
            <Icon
                name={icon}
                size={Platform.OS === 'android' ? 20 : 23}
                color={
                    routeName === selectTab
                        ? Platform.OS === 'ios' && forceDark
                            ? BaseColor.whiteColor
                            : colors.primary
                        : BaseColor.grayColor
                }
                solid
            />
        );
    };

    return (
        <MultiBarProvider
            overlayProps={{
                expandingMode: 'staging',
            }}
            data={[
                ({params}) => (
                    <TouchIcon
                        name="plus"
                        color={colors.primary}
                        size={20}
                        onPress={() => {
                            if (params.canGoBack()) {
                                // params.goBack();
                            }
                        }}
                    />
                ),
                ({params}) => (
                    <TouchIcon
                        name="calendar-plus"
                        color={colors.primary}
                        size={20}
                        onPress={() => {
                            console.log('Params', params);
                            navigation.navigate('AddWorkshopScreen');
                        }}
                    />
                ),
                ({params}) => (
                    <TouchIcon
                        name="folder-plus"
                        color={colors.primary}
                        size={20}
                        onPress={() => {
                        }}
                    />
                ),
            ]}
            initialExtrasVisible={false}>
            <CurvedBottomBar.Navigator
                type="up"
                ref={ref}
                style={{overflow: 'hidden'}}
                bgColor={colors.card}
                borderTopLeftRight
                height={Platform.OS === 'android' ? 40 : 70}
                circleWidth={Platform.OS === 'android' ? 40 : 50}
                initialRouteName="HomeScreen"
                tabBarOptions={{
                    showLabel: true,
                    activeTintColor:
                        Platform.OS === 'ios' && forceDark
                            ? BaseColor.whiteColor
                            : colors.primary,
                    inactiveTintColor: BaseColor.grayColor,
                    labelStyle: {
                        fontSize: 12,
                        fontFamily: `${font}-Regular`,
                    },
                    style: {
                        backgroundColor: colors.card,
                    },
                }}
                tabBar={props => (
                    <TouchableOpacity
                        onPress={() => props.navigate(props.routeName)}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {renderIcon(props.routeName, props.selectTab)}
                    </TouchableOpacity>
                )}
                renderCircle={({selectTab, navigate}) => (
                    <MultiBarButton
                        onPress={() => {
                        }}
                        style={[
                            {
                                backgroundColor: colors.primary,
                            },
                            styles.btnCircle,
                        ]}>
                        <Icon
                            name="map"
                            style={{
                                fontSize: 20,
                                color: BaseColor.whiteColor,
                            }}
                        />
                    </MultiBarButton>
                )}>
                <CurvedBottomBar.Screen
                    name="HomeScreen"
                    component={({navigate}) => <HomeScreen/>}
                    options={{
                        title: t('home'),
                        tabBarIcon: ({color}) => (
                            <Icon color={color} name="home" size={20} solid/>
                        ),
                    }}
                    position="left"
                />
                <CurvedBottomBar.Screen
                    name="EventScreen"
                    component={({navigate}) => <TrajetPlanningScreen/>}
                    options={{
                        title: t('events'),
                        tabBarIcon: ({color}) => (
                            <Icon
                                color={color}
                                name="calendar-alt"
                                size={20}
                                solid
                            />
                        ),
                    }}
                    position="left"
                />
                <CurvedBottomBar.Screen
                    name="BookingScreen"
                    component={({navigate}) => <HomeScreen/>}
                    options={{
                        title: t('bookings'),
                        tabBarIcon: ({color}) => (
                            <Icon color={color} name="users" size={20} solid/>
                        ),
                    }}
                    position="right"
                />
                <CurvedBottomBar.Screen
                    name="MessageScreen"
                    component={({navigate}) => <HomeScreen/>}
                    options={{
                        title: t('messages'),
                        tabBarIcon: ({color}) => (
                            <Icon
                                color={color}
                                name="comments"
                                size={20}
                                solid
                            />
                        ),
                    }}
                    position="right"
                />
            </CurvedBottomBar.Navigator>
        </MultiBarProvider>
    );
}

const styles = StyleSheet.create({
    firstSemiCircle: {
        width: THEME_ITEM_SIZE * 1.3,
        height: THEME_ITEM_SIZE * 1.3,
        borderRadius: (THEME_ITEM_SIZE * 1.3) / 2,
        overflow: 'hidden',
    },
    secondSemiCircle: {
        width: THEME_ITEM_SIZE * 1.3,
        height: (THEME_ITEM_SIZE * 1.3) / 2,
        position: 'absolute',
    },
    btnCircle: {
        width: Platform.OS === 'android' ? 50 : 65,
        height: Platform.OS === 'android' ? 50 : 65,
        borderRadius: Platform.OS === 'android' ? 25 : 32.5,
        top: Platform.OS === 'android' ? -18 : -15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    lineSeparator: {
        borderWidth: 1,
        width: '40%',
        height: 1,
        alignSelf: 'center',
    },
    line: {
        width: 1,
        height: 14,
        backgroundColor: BaseColor.grayColor,
        marginLeft: 10,
    },
    contentModeView: {
        width: 30,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    contentFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    contentFilterBottom: {
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 20,
    },
    contentSwipeDown: {
        paddingTop: 10,
        alignItems: 'center',
    },
    lineSwipeDown: {
        width: 30,
        height: 2.5,
        backgroundColor: BaseColor.dividerColor,
    },
    contentActionModalBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    itemDashboard: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
    },
    imageBackground: {
        height: 140,
        width: '100%',
        position: 'absolute',
    },
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
    bindActionCreators({}, dispatch);

export default connect(null, {})(BottomTabNavigator);
