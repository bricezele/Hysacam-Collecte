/**
 * Project HysacamCollecte
 * File Styles
 * Path app/config
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import {StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth} from "../utils/Tools";

export const BaseStyle = StyleSheet.create({
    textInput: {
        width: scaleWidth(295),
        height: scaleHeight(48),
        borderRadius: scaleHeight(24),
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    safeAreaView: {
        flex: 1,
    },
});
