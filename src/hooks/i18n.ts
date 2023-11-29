import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

//use the initReactI18next plugin with i18next to make it easier for
//internationalization of react app easier
i18n.use(initReactI18next).init({
    lng: "en", //default language
    fallbackLng: "en", //lang that will be loaded in case the translations the user is looking for are not available
    interpolation: {
        escapeValue: false,//used to escape the values and avoid XSS attacks, we will set it to false, because React already does it by default
    },
    resources: { //an object with the translations to be used in the application
        en: {
            translation: {
                movies: "movies",
                about: "about us",
                contact: "contact us",
                user: "My name is: {{name}}"
            },
        },
        am: {
            translation: {
                movies: "ֆիլմեր",
                about: "Մեր մասին",
                contact: "կապ",
                user: "Mi nombre es: {{name}}"
            },
        },
        ru: {
            translation: {
                movies: "фильмы",
                about: "о нас",
                contact: "контакт",
                user: "Mi chiamo: {{name}}"
            },
        },
    },
});

export default i18n;