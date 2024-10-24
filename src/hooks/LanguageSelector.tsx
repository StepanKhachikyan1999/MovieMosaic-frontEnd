import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import armFlag from '../logos/armenia.png'
import ruFlag from '../logos/russia.png'
import enFlag from '../logos/united-kingdom.png'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const countries = [
    {
        flag: armFlag,
        name: "ARM",
    },
    {
        flag: enFlag,
        name: "ENG",
    },
    {
        flag: ruFlag,
        name: "RU",
    },
];

function LanguageSelector() {
    const {i18n} = useTranslation();
    const defaultLanguage = localStorage.getItem('language')
    const [openMenu, setOpenMenu] = useState(false);
    const [lang, setLang] = useState(defaultLanguage || "ARM");

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (!storedLanguage) {
            localStorage.setItem('language', 'ARM');
        } else if (countries.some(lang => lang.name === storedLanguage)) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        setLang(lang);
    };

    return (
        // <div className="relative">
        //     <div
        //         className="flex items-center cursor-pointer"
        //         onClick={() => setIsOpen(!isOpen)}
        //     >
        //         {LANGUAGES.map(({label, code, img}) => (
        //             code === i18n.language ? (
        //                 <img key={code} src={img} alt="language" className="w-6 h-6 mx-2 ml-2"/>
        //             ) : null
        //         ))}
        //     </div>
        //     {isOpen && (
        //         <div className="absolute top-full left-0 mt-1 py-1 w-10 bg-dry rounded shadow-lg">
        //             {LANGUAGES.filter(({code}) => code !== i18n.language).map(({label, code, img}) => (
        //                 <div
        //                     key={code}
        //                     className="flex items-center cursor-pointer px-2 py-1 hover:bg-gray-200"
        //                     onClick={() => changeLanguage(code)}
        //                 >
        //                     <img src={img} alt="language" className="w-6 h-5 mr-2"/>
        //                     {/*<span>{label}</span>*/}
        //                 </div>
        //             ))}
        //         </div>
        //     )}
        // </div>
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="sm" variant="outlined" className="flex items-center gap-2 border-none">
                    <img className='w-6' src={countries.find(({ name }) => name === lang)?.flag} alt="flag"/>
                    {lang}
                    <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`} />
                </Button>
            </MenuHandler>
            <MenuList className='z-10 flex flex-col gap-2 mt-2'>
                {countries.map(({ name, flag }) => (
                    <MenuItem key={name} onClick={() => changeLanguage(name)} className="flex items-center gap-2">
                        <img className='w-6' src={flag} alt="flag"/> {name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

export default LanguageSelector;
