/**
 * Project Hysacam
 * File index
 * Path app/components/Screen
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {BaseStyle} from '../config/Styles';
import {NetInfoBar} from './NetInfoBarComponent';

// import SafeAreaView from 'react-native-safe-area-view';

interface ScreenProps {
    children: ReactNode;
    style?: Object;
}

export const ScreenComponent = React.forwardRef((props, ref) => (
    <SafeAreaView style={[BaseStyle.safeAreaView, props.style]} {...props}>
        <NetInfoBar />
        {/* React.Children.map(props.children, child =>
                React.cloneElement(child, {}),
            ) */}
        {props.children}
    </SafeAreaView>
));
