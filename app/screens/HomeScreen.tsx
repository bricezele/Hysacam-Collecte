/**
 * Project HysacamCollecte
 * File HomeScreen
 * Path app/screens
 * Created by BRICE ZELE
 * Date: 06/12/2021
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenComponent} from "../components/ScreenComponent";
import {ScaledSheet} from "react-native-size-matters";
import MapView, {MAP_TYPES, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Dimensions, Image, Platform, TouchableOpacity, View} from "react-native";
import {
    getBottomSpace,
    handleLocationPermission,
    randomlyGetValueFromEnum,
    scaleHeight,
    scaleWidth
} from "../utils/Tools";
import Geolocation from "react-native-geolocation-service";
import Entypo from 'react-native-vector-icons/Entypo';
import {BaseColor, useTheme} from "../config/Theme";
import Modal from 'react-native-modal';
import MapViewDirections from 'react-native-maps-directions';
import {useTranslation} from "react-i18next";
import {connect, useDispatch} from "react-redux";
import Header from '../components/HeaderComponent';
import {Icon} from '../components/IconComponent';
import IoniconsIcons from "react-native-vector-icons/Ionicons";
import {createStructuredSelector} from "reselect";
import {selectUser} from "../redux/auth/oauth.selector";
import {Images} from "../assets/images/Images";
import TrashBinDetailComponent from "../components/TrashBinDetailComponent";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export const userLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
};
export const initialLatitudeDelta = 0.01202;
export const initialLongitudeDelta = 0.00081;
export const initialRadius = 1000;

const KEY_API = 'AIzaSyBUQoQYY31-S3DPp7aRRIAjEda8T2pZvJE';

const HomeScreen = ({navigation, user}) => {

    const {colors} = useTheme();
    const {t} = useTranslation();
    const {width, height} = Dimensions.get('window');
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    markersRef.current = [];

    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;

    const dispatch = useDispatch();
    const [pas, setPas] = useState(0.001);
    const [location, setLocation] = useState(null)
    const [showModalMarkerDetail, setShowModalMarkerDetail] = useState(false);
    const [showDirection, setShowDirection] = useState(false);
    const [trashBin, setTrashBin] = useState(null);

    const [truckPosition, setTruckPosition] = useState([
        {
            id: 0,
            coordinate: {latitude: 4.038150, longitude: 9.748890},
        },
        {
            id: 1,
            coordinate: {latitude: 4.020991, longitude: 9.736167},
        },
        {
            id: 2,
            coordinate: {latitude: 4.067428, longitude: 9.758038},
        },
        {
            id: 3,
            coordinate: {latitude: 4.066905, longitude: 9.724827},
        },
        {
            id: 4,
            coordinate: {latitude: 4.077457, longitude: 9.750653},
        },
        {
            id: 5,
            coordinate: {latitude: 4.064766, longitude: 9.787723},
        },
        {
            id: 6,
            coordinate: {latitude: 4.077457, longitude: 9.750653},
        },
        {
            id: 7,
            coordinate: {latitude: 4.023083, longitude: 9.764566},
        },
        {
            id: 8,
            coordinate: {latitude: 4.052409, longitude: 9.783816},
        },
        {
            id: 9,
            coordinate: {latitude: 4.045660, longitude: 9.789629},
        },
        {
            id: 10,
            coordinate: {latitude: 4.056972, longitude: 9.793727},
        },
    ]);

    const trashBinState = {
        EMPTY: 'EMPTY',
        MIDDLE_FULL: 'MIDDLE_FULL',
        FULL: 'FULL',
        OVERFLOW: 'OVERFLOW',
    };

    const [trashBinPosition] = useState(truckPosition.map(truck => {
        return {
            ...truck,
            coordinate: {
                latitude: truck.coordinate.latitude + 0.02,
                longitude: truck.coordinate.longitude + 0.01,
            },
            state: randomlyGetValueFromEnum(trashBinState)
        }
    }));


    useEffect(async () => {
        await handleLocationPermission();
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords
                const region = {
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                }
                mapRef?.current?.animateToRegion(region, 1000);
                setLocation({latitude, longitude});
            },
            error => {
                console.log(error.code, error.message)
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )

        const interval = setInterval(() => {
            setPas(pas => (Math.random() / 900) + pas);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log("Pas", pas);
        markersRef.current.map((markerRef, index) => {
            markerRef?.animateMarkerToCoordinate({
                latitude: truckPosition[index].coordinate.latitude + pas,
                longitude: truckPosition[index].coordinate.longitude + pas,
            }, 2000);
        });
    }, [pas]);


    const region = useMemo(
        () => ({
            ...truckPosition[3].coordinate,
            latitudeDelta: initialLatitudeDelta,
            longitudeDelta: initialLatitudeDelta,
        }),
        [],
    );
    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};

    const addToMarkersRef = (el) => {
        if (Platform.OS !== 'ios') {
            if (el && !markersRef?.current?.includes(el)) {
                markersRef?.current?.push(el);
            }
        }
    }

    const renderModalDetailTrash = () => (
        <Modal
            isVisible={showModalMarkerDetail}
            onSwipeComplete={() => setShowModalMarkerDetail(false)}
            swipeDirection={['down']}
            style={styles.bottomModal}>
            <View
                style={[
                    styles.contentFilterBottom,
                    {backgroundColor: colors.card},
                ]}>
                <View style={styles.contentSwipeDown}>
                    <View style={styles.lineSwipeDown}/>
                </View>
                <View
                    style={[
                        styles.contentActionModalBottom,
                        {borderBottomColor: colors.border},
                    ]}>
                    <View/>
                    <TouchableOpacity
                        onPress={() => setShowModalMarkerDetail(false)}>
                        <Entypo size={20} color={colors.primary} name="cross"/>
                    </TouchableOpacity>
                </View>
                <View style={[{marginBottom: 40}]}>
                    <TrashBinDetailComponent image={Images.trashBin}
                                             name={t('trash_bin')}
                                             state={trashBin.state}
                                             onPress={() => {
                                                 setShowDirection(true);
                                                 console.log("onclick");
                                             }}
                                             position={`${trashBin.coordinate.latitude}, ${trashBin.coordinate.longitude}`}/>
                </View>
            </View>
        </Modal>
    );

    return (
        <ScreenComponent>
            <Header
                style={{
                    height: 50,
                    backgroundColor: colors.background,
                    zIndex: 1000,
                }}
                renderLeft={
                    <Image source={Images.logo} style={styles.logo}/>
                }
                renderRight={
                    <Icon name="bell" size={20} color={colors.primary}/>
                }
                renderRightSecond={
                    <IoniconsIcons
                        name="person"
                        style={{marginTop: 3}}
                        size={20}
                        color={colors.primary}
                    />
                }
                styleRight={{marginTop: 5}}
            />
            <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    onMapReady={() => {

                    }}
                    scrollEnabled={true}
                    mapType={MAP_TYPES.STANDARD}
                    style={styles.mapView}
                    provider={PROVIDER_GOOGLE}>
                    {truckPosition.map(event => (<Marker
                        ref={addToMarkersRef}
                        coordinate={event.coordinate}
                        tracksViewChanges={true}>
                        <Image source={Images.truckIcon} style={{width: 40, height: 22}}/>
                    </Marker>))}

                    {trashBinPosition.map(trashBin => (
                        <Marker
                            onPress={() => {
                                setTrashBin(trashBin);
                                setShowModalMarkerDetail(true);
                            }}
                            coordinate={trashBin.coordinate}
                            tracksViewChanges={true}>
                            <Image source={Images.trashBin} style={{width: 25, height: 35}}/>
                        </Marker>))}

                    {location !== null && (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            description={t('my_position')}
                        >
                            <Image source={Images.marker} style={{width: 40, height: 40}}/>
                        </Marker>
                    )}
                    {
                        showDirection && (
                            <MapViewDirections
                                strokeColor={colors.primary}
                                strokeWidth={3}
                                onStart={() => setShowModalMarkerDetail(false)}
                                origin={{
                                    latitude: trashBin.coordinate.latitude,
                                    longitude: trashBin.coordinate.longitude
                                }}
                                destination={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                apikey={KEY_API}
                            />
                        )
                    }
                </MapView>
                <View style={styles.btmView}>
                    {showModalMarkerDetail && renderModalDetailTrash()}
                </View>
            </View>
        </ScreenComponent>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
});

export default connect(mapStateToProps, {})(HomeScreen);

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapView: {
        width: '100%',
        flex: 1,
    },
    btmView: {
        position: 'absolute',
        zIndex: 100,
        width: widthScreen,
        bottom: 0,
    },
    modalView: {
        marginBottom: getBottomSpace() + scaleHeight(24),
    },
    logo: {
        alignItems: 'flex-start',
        width: scaleWidth(100),
        height: scaleHeight(20),
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
    contentActionModalBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});
