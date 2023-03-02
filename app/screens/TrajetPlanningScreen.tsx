/**
 * Project HysacCollecte
 * File TrajerPlanningScreen
 * Path app/screens
 * Created by BRICE ZELE
 * Date: 07/12/2021
 */
import React, {useCallback, useEffect} from 'react';
import {useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../redux/auth/oauth.selector";
import {connect} from "react-redux";
import {ScaledSheet} from "react-native-size-matters";
import {ScreenComponent} from "../components/ScreenComponent";
import {selectGetTrajet, selectSubscribeToTrajet} from "../redux/user/user.selector";
import CalendarPanelComponent from "../components/CalendarPanelComponent";
import {Dimensions, FlatList, Platform, TouchableOpacity, View} from "react-native";
import {getBottomSpace, getStatusBarHeight, scaleHeight, scaleWidth} from "../utils/Tools";
import SvgDelete from "../assets/svg/SvgDelete";
import Text from '../components/TextComponent';
import {fetchGetTrajet} from "../redux/user/user.action";
import {Images} from "../assets/images/Images";
import AppointmentItem from "../components/TrajetItemComponent";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const TrajetPlanningScreen = ({navigation, fetchGetTrajet}) => {

    const {colors} = useTheme();
    const {t} = useTranslation();

    const TRAJET_COLLECTE = [
        {
            img: Images.truckIcon,
            time: '06:00 - 16:25',
            title: 'Route Akwa Nord ',
            color: '#0084F4',
        },
        {
            img: Images.truckIcon,
            time: '06:00 - 16:00',
            title: 'Interiur Banya ',
            color: '#00C48C',
        },
        {
            img: Images.truckIcon,
            time: '06:00 - 16:00',
            title: ' Derriere OILYBIA',
            color: '#F23A56',
        },
        {
            img: Images.truckIcon,
            time: '06:00 - 16;00',
            title: 'Intérieur quartier denver',
            color: '#FFCF5C',
        },
        {
            img: Images.truckIcon,
            time: '18:00 - 22:00',
            title: 'Carrefour Laureat \n- Rond point Maetur',
            color: '#0084F4',
        },
        {
            img: Images.truckIcon,
            time: '18:00 - 22:00',
            title: 'Route Lycée Akwa Nord \n - Terminus Bonamoussadi',
            color: '#00C48C',
        },
    ];

    const onGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const renderItem = useCallback(({item}) => {
        const {img, time, title, color} = item;
        return (
            <AppointmentItem
                style={{alignSelf: 'center', backgroundColor: color.backgroundColor}}
                img={img}
                time={time}
                title={title}
                color={color}
            />
        );
    }, []);

    useEffect(() => {
        fetchGetTrajet('deido');
    }, []);

    const listHeaderComponent = useCallback(() => {
        return (
            <View style={[styles.header, {backgroundColor: colors.primary,}]}>
                <Text whiteColor style={styles.txtHeader}>Trajet de collecte</Text>
                <CalendarPanelComponent/>
                <TouchableOpacity
                    onPress={onGoBack}
                    activeOpacity={0.6}
                    style={styles.svgDelete}>
                    <SvgDelete width={10} height={10}/>
                </TouchableOpacity>
            </View>
        );
    }, [onGoBack]);

    return (
        <ScreenComponent>
            <View style={[styles.container, {backgroundColor: colors.background}]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ListHeaderComponent={listHeaderComponent}
                    contentContainerStyle={styles.contentContainerStyle}
                    data={TRAJET_COLLECTE}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        </ScreenComponent>
    );
}

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    getTrajet: selectGetTrajet,
    subscribeToTrajet: selectSubscribeToTrajet
});

export default connect(mapStateToProps, {fetchGetTrajet})(TrajetPlanningScreen);

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    flatListView: {
        marginHorizontal: scaleWidth(24),
    },
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    },
    header: {
        width: widthScreen,
        flex: 1,
        borderBottomLeftRadius: scaleWidth(16),
        borderBottomRightRadius: scaleWidth(16),
        paddingTop:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(29)
                : scaleHeight(29),
        marginBottom: scaleHeight(16),
    },
    appointmentItem: {
        alignSelf: 'center',
    },
    svgDelete: {
        position: 'absolute',
        width: scaleWidth(40),
        height: scaleWidth(40),
        justifyContent: 'center',
        alignItems: 'center',
        top:
            Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(18)
                : scaleHeight(18),
    },
    txtHeader: {
        lineHeight: scaleHeight(20),
        fontWeight: '500',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
});
