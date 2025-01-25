import React from 'react'
import { Typography } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next'

function Footer() {
    const { t } = useTranslation()
    // const Links = [
    //     {
    //         title: 'Company',
    //         links: [
    //             {
    //                 name: 'Home',
    //                 link: '/',
    //             },
    //             {
    //                 name: 'About Us',
    //                 link: '/about-us',
    //             },
    //             {
    //                 name: 'Contact Us',
    //                 link: '/contact-us',
    //             },
    //             {
    //                 name: 'Movies',
    //                 link: '/movies',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Top Categories',
    //         links: [
    //             {
    //                 name: 'Action',
    //                 link: '#',
    //             },
    //             {
    //                 name: 'Romantic',
    //                 link: '#',
    //             },
    //             {
    //                 name: 'Drama',
    //                 link: '#',
    //             },
    //             {
    //                 name: 'Historical',
    //                 link: '#',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'My Account',
    //         links: [
    //             {
    //                 name: 'Dashboard',
    //                 link: '/dashboard',
    //             },
    //             {
    //                 name: 'My Favorites',
    //                 link: '/favorite',
    //             },
    //             {
    //                 name: 'Profile',
    //                 link: '/profile',
    //             },
    //             {
    //                 name: 'Change Password',
    //                 link: '/password',
    //             },
    //         ],
    //     },
    // ];
    return (
        <div>
      <footer className="flex w-full flex-row flex-wrap items-center
      justify-center gap-y-6 gap-x-12 border-t border-neutral-200 py-6 pl-4 pr-4 text-center">
                <Typography color="blue-gray" className="font-normal flex items-center justify-center gap-2">
                    &copy; 2024 filmhouse.am
                    {/*<div style={{*/}
                    {/*    color: 'white',*/}
                    {/*    textAlign: 'center',*/}
                    {/*    padding: '5px'*/}
                    {/*}}>*/}
                    {/*    {t('createdBy')} <a style={{*/}
                    {/*    color: '#046381',*/}
                    {/*    fontSize: '15px'*/}
                    {/*}} target='_blank' href="https://meekz-it.vercel.app/">MeekzIT</a>*/}
                    {/*</div>*/}
                </Typography>
            </footer>
        </div>
    )
}

export default Footer