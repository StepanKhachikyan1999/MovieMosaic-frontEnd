import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

//use the initReactI18next plugin with i18next to make it easier for
//internationalization of react app easier
i18n.use(initReactI18next).init({
    lng: "ARM", //default language
    fallbackLng: "ARM", //lang that will be loaded in case the translations the user is looking for are not available
    interpolation: {
        escapeValue: false,//used to escape the values and avoid XSS attacks, we will set it to false, because React already does it by default
    },
    resources: { //an object with the translations to be used in the application
        ENG: {
            translation: {
                movies: "movies",
                serials: "Serials",
                cartoons: "Cartoons",
                about: "about us",
                contact: "contact us",
                blog: "Blog",
                wishList: "Wish list",
                searchMovieName: "Search ․․․",
                watch: "Watch",
                aboutUs: "About Us",
                login: "Login",
                user: "My name is: {{name}}"
            },
        },
        ARM: {
            translation: {
                movies: "ֆիլմեր",
                serials: "Սերիալներ",
                cartoons: "Մուլտեր",
                about: "Մեր մասին",
                contact: "կապ",
                blog: "Բլոգ",
                wishList: "Ընտրվածների ցանկ",
                searchMovieName: "Որոնում ․․․",
                watch: "Դիտել",
                aboutUs: "Մեր Մասին",
                login: "Մուտք",
                user: "Mi nombre es: {{name}}"
            },
        },
        RU: {
            translation: {
                movies: "фильмы",
                serials: "Сериалы",
                cartoons: "мультики",
                about: "о нас",
                contact: "контакт",
                blog: "Блог",
                wishList: "список пожеланий",
                searchMovieName: "Найдите названия фильмов здесь ․․․",
                watch: "Смотреть",
                aboutUs: "О нас",
                login: "Вход",
                user: "Mi chiamo: {{name}}"
            },
        },
    },
});

export default i18n;