/**
 * Project HysacamCollecte
 * File Typography
 * Path app/config
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import {StyleSheet} from 'react-native';

type FontWeightType =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
export const FontWeight: Record<string, FontWeightType> = {
    thin: '100',
    ultraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
};

export const Typography = StyleSheet.create({
    header: {
        fontSize: 34,
        fontWeight: FontWeight.regular,
    },
    title1: {
        fontSize: 28,
        fontWeight: FontWeight.regular,
    },
    title2: {
        fontSize: 22,
        fontWeight: FontWeight.regular,
    },
    title3: {
        fontSize: 20,
        fontWeight: FontWeight.regular,
    },
    headline: {
        fontSize: 17,
        fontWeight: FontWeight.regular,
    },
    body1: {
        fontSize: 17,
        fontWeight: FontWeight.regular,
    },
    body2: {
        fontSize: 14,
        fontWeight: FontWeight.regular,
    },
    callout: {
        fontSize: 17,
        fontWeight: FontWeight.regular,
    },
    subhead: {
        fontSize: 15,
        fontWeight: FontWeight.regular,
    },
    footnote: {
        fontSize: 13,
        fontWeight: FontWeight.regular,
    },
    caption1: {
        fontSize: 12,
        fontWeight: FontWeight.regular,
    },
    caption2: {
        fontSize: 11,
        fontWeight: FontWeight.regular,
    },
    overline: {
        fontSize: 10,
        fontWeight: FontWeight.regular,
    },
});
