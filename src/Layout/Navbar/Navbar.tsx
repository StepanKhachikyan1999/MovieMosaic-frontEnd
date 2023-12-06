import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {FaHeart} from 'react-icons/fa'
import {CgUser} from 'react-icons/cg'
import {useTranslation} from 'react-i18next'
import {LANGUAGES} from '../../constants/constants'
import logo from '../../images/logo.png'
import useDisplaySize from "../../hooks/displaySize";
import {IoIosSearch, IoMdClose} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";


type HoverProps = {
    isActive: boolean
}

const Navbar = () => {
    const {i18n, t} = useTranslation()
    const {width} = useDisplaySize()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    console.log(width, 'sizeScreen')


    const hover = 'hover:text-subMain text-white transitions'
    const Hover = ({isActive}: HoverProps) => (isActive ? 'text-subMain' : hover)

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value
        i18n.changeLanguage(lang_code)
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    // Toggle search input visibility
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };
    return (
        <>
            <div className={`bg-main shadow-md sticky top-0 z-20 ${width < 1024 && isMenuOpen && `h-screen`}`}>
                <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                    <div className='col-span-1 lg:block hidden'>
                        <Link to='/'>
                            <img className='w-full h-12 object-contain' src={logo} alt='logo'/>
                        </Link>
                    </div>
                    <div className='flex justify-between items-center lg:justify-evenly gap-6'>
                        <div className='col-span-1 lg:hidden block'>
                            <Link to='/'>
                                <img className='w-full h-12 object-contain' src={logo} alt='logo'/>
                            </Link>
                        </div>

                        <div className='col-span-3 flex justify-end'>
                            {/* Hamburger Menu Button for Tablet and Mobile */}
                            <div className='flex gap-1.5'>
                                <div className='lg:hidden'>
                                    <button onClick={toggleSearch} className='text-orange-500 text-[22px]'>
                                        <IoIosSearch/>
                                    </button>
                                </div>
                                <div className='lg:hidden'>
                                    <button onClick={toggleMenu} className='text-orange-500 text-[22px]'>
                                        {isMenuOpen ? <IoMdClose/> : <CiMenuFries/>}
                                    </button>
                                </div>
                            </div>

                            {/* Search Bar */}
                            {
                                width > 1024 || isSearchOpen ? <form
                                    className={`w-full text-sm bg-dryGray rounded flex-btn gap-4 ${
                                        (isMenuOpen || isSearchOpen) ? 'lg:flex' : 'hidden lg:flex'
                                    }`}
                                    action=''
                                >
                                    <button type='submit' className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                                        <IoIosSearch onClick={toggleSearch}/>
                                    </button>
                                    <input
                                        type='text'
                                        placeholder='Search Movie'
                                        className={`font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black block`}
                                    />
                                </form> : <></>
                            }

                        </div>
                    </div>

                    {/* Main Navigation Links */}
                    <div
                        className={`col-span-3 font-medium text-sm ${width < 1024 && isMenuOpen && `h-60`}  ${
                            isMenuOpen ? 'flex flex-col lg:hidden' : 'hidden lg:flex'
                        } lg:gap-14 2xl:gap-20 justify-between items-center`}
                    >
                        <NavLink to='/movies' className={Hover}>
                            {t('movies')}
                        </NavLink>
                        <NavLink to='/about-us' className={Hover}>
                            {t('about')}
                        </NavLink>
                        <NavLink to='/contact-us' className={Hover}>
                            {t('contact')}
                        </NavLink>
                        <NavLink to='/login' className={Hover}>
                            <CgUser className='w-8 h-8'/>
                        </NavLink>
                        <NavLink to='/favorites' className={`${Hover} relative`}>
                            <FaHeart className='w-6 h-6'/>
                            <div
                                className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>
                                3
                            </div>
                        </NavLink>

                        {/* Language Selector */}
                        <select
                            defaultValue={i18n.language}
                            onChange={onChangeLang}
                            className='bg-main cursor-pointer'
                        >
                            {LANGUAGES.map(({code, label}) => (
                                <option key={code} value={code} className='bg-main text-dryGray cursor-pointer'>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar