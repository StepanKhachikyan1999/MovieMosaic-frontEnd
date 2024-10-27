import React, { FC } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ComingSoon:FC = () => {
    const { t } = useTranslation()
    return (
            <div
                className="bg-main absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen flex items-center">
                <div className="text-center w-full mx-auto lg:px-8 z-20">
                    <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block text-white">
              {t('comingSoon')}!
            </span>
                    </h2>
                    <div className="lg:mt-0 lg:flex-shrink-0">
                        <div className="mt-6 inline-flex rounded-md shadow">
                            <NavLink to="/" className="hover:text-subMain transitions text-white flex items-center">
                                <button type="button"
                                        className="py-4 px-6  bg-subMain focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    {t('backToHome')}
                                </button>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ComingSoon;