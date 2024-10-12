import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import arm from '../logos/armenia.png';

interface Language {
    label: string;
    code: string;
    img: string;
}

const LANGUAGES: Language[] = [
    // {label: 'EN', code: 'en', img: eng},
    {label: 'AM', code: 'am', img: arm},
    // {label: 'RU', code: 'ru', img: rus},
];

function LanguageSelector() {
    const {i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (!storedLanguage) {
            // Set default language to 'en' if not already set
            localStorage.setItem('language', 'am');
        } else if (LANGUAGES.some(lang => lang.code === storedLanguage)) {
            // Change language to the one stored in local storage
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]); // Dependency on i18n to ensure it runs whenever the language changes

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('language', code); // Store selected language in local storage
        setIsOpen(false); // Close the dropdown after selecting a language
    };

    return (
        <div className="relative">
            <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {LANGUAGES.map(({label, code, img}) => (
                    code === i18n.language ? (
                        <img key={code} src={img} alt="language" className="w-6 h-6 mx-2 ml-2"/>
                    ) : null
                ))}
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 py-1 w-10 bg-dry rounded shadow-lg">
                    {LANGUAGES.filter(({code}) => code !== i18n.language).map(({label, code, img}) => (
                        <div
                            key={code}
                            className="flex items-center cursor-pointer px-2 py-1 hover:bg-gray-200"
                            onClick={() => changeLanguage(code)}
                        >
                            <img src={img} alt="language" className="w-6 h-5 mr-2"/>
                            {/*<span>{label}</span>*/}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;
