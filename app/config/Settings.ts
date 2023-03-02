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
    languageSupport: ['en', 'fr'],
    resourcesLanguage: {
        en: {
            translation: require('../lang/en.json'),
        },
        fr: {
            translation: require('../lang/fr.json'),
        }
    }
};
