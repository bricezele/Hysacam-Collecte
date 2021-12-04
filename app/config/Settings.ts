/**
 * Project HysacamCollecte
 * File Settings
 * Path app/config
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import Config from 'react-native-config';

export const BaseSettings = {
    name: Config.APP_NAME,
    displayName: Config.APP_NAME,
    appVersion: Config.APP_VERSION,
    defaultLanguage: 'fr',
    languageSupport: ['de', 'en', 'es', 'fr'],
    resourcesLanguage: {
        en: {
            translation: require('../lang/en.json'),
        },
        fr: {
            translation: require('../lang/fr.json'),
        },
        es: {
            translation: require('../lang/es.json'),
        },
        de: {
            translation: require('../lang/de.json'),
        },
    },
    euroToXafRate: 655.69
};
