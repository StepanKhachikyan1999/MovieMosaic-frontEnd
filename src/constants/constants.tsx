import React from 'react';

import arm from '../logos/armenia.svg';
import rus from '../logos/russia.svg';
import eng from '../logos/united.svg';

type LanguageCode = 'en' | 'am' | 'ru';

type Language = {
    label: string;
    code: LanguageCode;
    img: React.ReactElement;
};

const LANGUAGES: Language[] = [
    {label: 'EN', code: 'en', img: <img src={arm} alt="img" className="inline-block w-4 h-4 mx-2"/>},
    {label: 'AM', code: 'am', img: <img src={rus} alt="img" className="inline-block w-4 h-4 mx-2"/>},
    {label: 'RU', code: 'ru', img: <img src={eng} alt="img" className="inline-block w-4 h-4 mx-2"/>},
];

export default LANGUAGES
