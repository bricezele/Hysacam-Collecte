/**
 * Project YooLearn
 * File TextComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import React, {ReactNode} from 'react';
import {StyleSheet, Text as TextComp, TextStyle, ViewStyle} from 'react-native';
import {BaseColor, useFont, useTheme} from "../config/Theme";
import {FontWeight, Typography} from "../config/Typography";

interface TextComponentProps {
    header?: boolean;
    title1?: boolean;
    title2?: boolean;
    title3?: boolean;
    headline?: boolean;
    body1?: boolean;
    body2?: boolean;
    callout?: boolean;
    subhead?: boolean;
    footnote?: boolean;
    caption1?: boolean;
    caption2?: boolean;
    overline?: boolean;
    //define font custom
    thin?: boolean;
    ultraLight?: boolean;
    light?: boolean;
    regular?: boolean;
    medium?: boolean;
    semibold?: boolean;
    bold?: boolean;
    heavy?: boolean;
    black?: boolean;
    //custon for text color
    primaryColor?: boolean;
    darkPrimaryColor?: boolean;
    lightPrimaryColor?: boolean;
    accentColor?: boolean;
    grayColor?: boolean;
    dividerColor?: boolean;
    whiteColor?: boolean;
    fieldColor?: boolean;
    //numberOfLines
    numberOfLines?: number;
    textAlign?: string;
    style?: ViewStyle | TextStyle;
    children: ReactNode;
}

const Text = ({
                  //props for style
                  header = false,
                  title1 = false,
                  title2 = false,
                  title3 = false,
                  headline = false,
                  body1 = false,
                  body2 = false,
                  callout = false,
                  subhead = false,
                  footnote = false,
                  caption1 = false,
                  caption2 = false,
                  overline = false,
                  //props for font
                  thin = false,
                  ultraLight = false,
                  light = false,
                  regular = false,
                  medium = false,
                  semibold = false,
                  bold = false,
                  heavy = false,
                  black = false,
                  //custon for text color
                  primaryColor = false,
                  darkPrimaryColor = false,
                  lightPrimaryColor = false,
                  accentColor = false,
                  grayColor = false,
                  dividerColor = false,
                  whiteColor = false,
                  fieldColor = false,
                  //numberOfLines
                  numberOfLines = 10,
                  textAlign = 'left',
                  //custom style
                  style = {},
                  children = '',
              }: TextComponentProps) => {

    const {colors} = useTheme();
    const font = useFont();
    return (
        <TextComp
            style={StyleSheet.flatten([
                {fontFamily: `${font}-Regular`, textAlign},
                header && Typography.header,
                title1 && Typography.title1,
                title2 && Typography.title2,
                title3 && Typography.title3,
                headline && Typography.headline,
                body1 && Typography.body1,
                body2 && Typography.body2,
                callout && Typography.callout,
                subhead && Typography.subhead,
                footnote && Typography.footnote,
                caption1 && Typography.caption1,
                caption2 && Typography.caption2,
                overline && Typography.overline,
                //custom for font
                thin && StyleSheet.flatten({fontWeight: FontWeight.thin}),
                ultraLight && StyleSheet.flatten({fontWeight: FontWeight.ultraLight}),
                light && StyleSheet.flatten({fontWeight: FontWeight.light}),
                regular && StyleSheet.flatten({fontWeight: FontWeight.regular}),
                medium && StyleSheet.flatten({fontWeight: FontWeight.medium}),
                semibold && StyleSheet.flatten({fontWeight: FontWeight.semibold}),
                bold && StyleSheet.flatten({fontWeight: FontWeight.bold}),
                heavy && StyleSheet.flatten({fontWeight: FontWeight.heavy}),
                black && StyleSheet.flatten({fontWeight: FontWeight.black}),
                // default color
                StyleSheet.flatten({color: colors.text}),
                //custom for color
                primaryColor && StyleSheet.flatten({color: colors.primary}),
                darkPrimaryColor && StyleSheet.flatten({color: colors.primaryDark}),
                lightPrimaryColor && StyleSheet.flatten({color: colors.primaryLight}),
                accentColor && StyleSheet.flatten({color: colors.accent}),
                grayColor && StyleSheet.flatten({color: BaseColor.grayColor}),
                dividerColor && StyleSheet.flatten({color: BaseColor.dividerColor}),
                whiteColor && StyleSheet.flatten({color: BaseColor.whiteColor}),
                fieldColor && StyleSheet.flatten({color: BaseColor.fieldColor}),
                style && style,
            ])}
            numberOfLines={numberOfLines}>
            {children}
        </TextComp>
    );
}
export default Text;
