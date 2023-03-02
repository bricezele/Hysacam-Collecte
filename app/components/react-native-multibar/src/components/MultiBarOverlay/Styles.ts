import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        position: 'relative',
        bottom: 0,
        alignSelf: 'center',
    },
    itemContainer: {
        zIndex: 100,
        position: 'absolute',
        overflow: 'hidden',
    },
});
