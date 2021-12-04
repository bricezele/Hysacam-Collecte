/**
 * Project HysacamCollecte
 * File Theme
 * Path app/config
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import {useDarkMode} from 'react-native-dynamic';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../redux';

export const BaseColor = {
    grayColor: '#9B9B9B',
    dividerColor: '#BDBDBD',
    whiteColor: '#FFFFFF',
    fieldColor: '#F5F5F5',
    navyBlue: '#2d65af',
    kashmir: '#5D6D7E',
    orangeColor: '#E5634D',
    blueColor: '#5DADE2',
    pinkColor: '#A569BD',
    greenColor: '#19AA9F',
    yellowColor: '#FDC60A',
};

/**
 * Define Const list theme use for whole application
 */
export const ThemeSupport = [
    {
        theme: 'blue',
        light: {
            dark: false,
            colors: {
                primary: '#2d65af',
                primaryDark: '#24508c',
                primaryLight: '#68c9ef',
                accent: '#FF8A65',
                background: '#ffffff',
                card: '#f2f2f2',
                text: '#212121',
                border: '#c7c7cc',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#2d65af',
                primaryDark: '#24508c',
                primaryLight: '#68c9ef',
                accent: '#FF8A65',
                background: '#010101',
                card: '#121212',
                text: '#e5e5e7',
                border: '#272729',
            },
        },
    },
    {
        theme: 'orange',
        light: {
            dark: false,
            colors: {
                primary: '#E5634D',
                primaryDark: '#C31C0D',
                primaryLight: '#FF8A65',
                accent: '#4A90A4',
                background: '#f2f2f2',
                card: '#ffffff',
                text: '#212121',
                border: '#c7c7cc',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#E5634D',
                primaryDark: '#C31C0D',
                primaryLight: '#FF8A65',
                accent: '#4A90A4',
                background: '#010101',
                card: '#121212',
                text: '#e5e5e7',
                border: '#272729',
            },
        },
    },
    {
        theme: 'pink',
        light: {
            dark: false,
            colors: {
                primary: '#A569BD',
                primaryDark: '#C2185B',
                primaryLight: '#F8BBD0',
                accent: '#8BC34A',
                background: '#f2f2f2',
                card: '#ffffff',
                text: '#212121',
                border: '#c7c7cc',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#A569BD',
                primaryDark: '#C2185B',
                primaryLight: '#F8BBD0',
                accent: '#8BC34A',
                background: '#010101',
                card: '#121212',
                text: '#e5e5e7',
                border: '#272729',
            },
        },
    },
    {
        theme: 'green',
        light: {
            dark: false,
            colors: {
                primary: '#19AA9F',
                primaryDark: '#048F72',
                primaryLight: '#C8E6C9',
                accent: '#e53a34',
                background: '#f2f2f2',
                card: '#ffffff',
                text: '#212121',
                border: '#c7c7cc',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#58D68D',
                primaryDark: '#388E3C',
                primaryLight: '#C8E6C9',
                accent: '#DB1C5C',
                background: '#010101',
                card: '#121212',
                text: '#e5e5e7',
                border: '#272729',
            },
        },
    },
    {
        theme: 'yellow',
        light: {
            dark: false,
            colors: {
                primary: '#FDC60A',
                primaryDark: '#FFA000',
                primaryLight: '#FFECB3',
                accent: '#795548',
                background: '#f2f2f2',
                card: '#ffffff',
                text: '#212121',
                border: '#c7c7cc',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#FDC60A',
                primaryDark: '#FFA000',
                primaryLight: '#FFECB3',
                accent: '#795548',
                background: '#010101',
                card: '#121212',
                text: '#e5e5e7',
                border: '#272729',
            },
        },
    },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
    theme: 'blue',
    light: {
        dark: false,
        colors: {
            primary: '#2d65af',
            primaryDark: '#24508c',
            primaryLight: '#68c9ef',
            accent: '#FF8A65',
            background: '#f2f2f2',
            card: '#ffffff',
            text: '#212121',
            border: '#c7c7cc',
        },
    },
    dark: {
        dark: true,
        colors: {
            primary: '#2d65af',
            primaryDark: '#24508c',
            primaryLight: '#68c9ef',
            accent: '#FF8A65',
            background: '#010101',
            card: '#121212',
            text: '#e5e5e7',
            border: '#272729',
        },
    },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = ['Roboto'];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Roboto';
/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
    const isDarkMode = useDarkMode();
    const forceDark = useSelector(
        (state: RootReducerType) => state.application.force_dark,
    );
    const themeStorage = useSelector(
        (state: RootReducerType) => state.application.theme,
    );
    const listTheme = ThemeSupport.filter(item => item.theme === themeStorage);
    const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

    if (forceDark) return {theme: theme.dark, colors: theme.dark.colors};
    return {theme: theme.light, colors: theme.light.colors};

    return isDarkMode
        ? {theme: theme.dark, colors: theme.dark.colors}
        : {theme: theme.light, colors: theme.light.colors};
};

export const useFont = () => {
    const font = useSelector(
        (state: RootReducerType) => state.application.font,
    );
    return font ?? DefaultFont;
};
