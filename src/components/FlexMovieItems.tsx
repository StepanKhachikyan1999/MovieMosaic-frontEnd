import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { useTranslation } from 'react-i18next'

function FlexMovieItems({movie}: any) {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{t(`filters.${movie.category}`)}</span>
            </div>
            <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-subMain w-3 h-3"/>
                <span className="text-sm font-medium">{movie.year}</span>
            </div>
            <div className="flex items-center gap-2">
                <BiTime className="text-subMain w-3 h-3"/>
                <span className="text-sm font-medium">{movie.time} Hr</span>
            </div>
        </>
    );
}

export default FlexMovieItems

// new
