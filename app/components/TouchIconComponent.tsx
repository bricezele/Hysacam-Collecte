/**
 * Project Hysacam
 * File TouchIconComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 14/10/2021
 */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type Props = Pick<TouchableOpacityProps, 'onPress'> & {
    color?: string;
    name: string;
    size?: number;
};

export const TouchIcon: React.FC<Props> = ({color, name, size, onPress}) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <FontAwesome5Icon
            name={name}
            style={{
                color,
                fontSize: size,
            }}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
    },
});
