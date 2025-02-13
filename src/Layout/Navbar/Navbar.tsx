import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    Button,
    IconButton,
    MobileNav,
    Navbar,
    Typography
} from '@material-tailwind/react'
import { FaHeart, FaSearch } from "react-icons/fa";
import LanguageSelector from "../../hooks/LanguageSelector";
import logo from "../../logos/film_logo.svg"

function NavBar(): any {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const { t } = useTranslation()
    // const { width } = useDisplaySize()

    // @ts-ignore
    const { userInfo } = useSelector((state) => state.userLogin);
    // @ts-ignore
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    // const hover = "hover:text-subMain transitions text-white";
    // @ts-ignore
    // const Hover = ({isActive}) => (isActive ? "text-subMain" : hover);

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/movies/${search}`);
            setSearch(search);
        } else {
            navigate(`/movies`);
        }
    };

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <form onSubmit={handleSearch} className="w-full text-sm bg-dryGray rounded flex gap-4 lg:hidden">
                <button type="submit" className="bg-subMain w-12 flex justify-center items-center h-12 rounded text-white">
                    <FaSearch />
                </button>
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
                       placeholder={t('searchMovieName')}
                       className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black" />
            </form>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink to="/movies?type=movies" className="hover:text-subMain transitions text-white flex items-center">
                    {t('movies')}
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink to="/movies?type=serials" className="hover:text-subMain transitions text-white flex items-center">
                    {t('serials')}
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink to="/movies?type=cartoons" className="hover:text-subMain transitions text-white flex items-center">
                    {t('cartoons')}
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink to="/coming-soon" className="hover:text-subMain transitions text-white flex items-center">
                    {t('blog')}
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium"
            >
                <NavLink to="/favorites" className="hover:text-subMain transitions text-white flex items-center lg:hidden">
                    {t('wishList')}
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium lg:hidden"
            >
                <NavLink to="/login" className="hover:text-subMain transitions text-white flex items-center lg:hidden">
                    <Button variant="text" size="sm" className='p-0'>{t('login')}</Button>
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="flex p-0 items-center gap-x-2 p-1 font-medium lg:hidden"
            >
                <LanguageSelector />
            </Typography>
        </ul>
    );

    return (
        <>
                <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-main shadow-md border-none sticky top-0 z-20">
                    <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                        <Link to='/'>
                            <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
                                <img src={logo} alt="logo"/>
                            </Typography>
                        </Link>
                        <form onSubmit={handleSearch} className="w-1/2 text-sm bg-dryGray rounded flex gap-4 hidden lg:flex md:max-w-sm">
                            <button type="submit" className="bg-subMain w-12 flex justify-center items-center h-12 rounded text-white">
                                <FaSearch />
                            </button>
                            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
                                   placeholder={t('searchMovieName')}
                                   className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black md:max-w-sm" />
                        </form>
                        <div className="hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <NavLink
                                to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"}
                                className="hover:text-subMain transitions text-white"
                            >
                                {userInfo ? (
                                    userInfo?.image ? (
                                        <img
                                            src={userInfo?.image}
                                            alt={userInfo?.fullName}
                                            className="w-8 h-8 rounded-full border object-cover border-subMain"
                                        />
                                    ) : (
                                        <span className="w-8 h-8 rounded-full border object-cover border-subMain flex items-center justify-center">
                                            {userInfo?.fullName.substring(0, 1).toUpperCase()}
                                        </span>
                                    )
                                ) : (
                                    <Button variant="text" size="sm" className="hidden lg:inline-block">
                                        {t("login")}
                                    </Button>
                                )}
                            </NavLink>
                            <NavLink to="/favorites" className="relative hover:text-subMain transitions text-white hidden lg:flex">
                                <FaHeart className="w-6 h-6" />
                                <div className="w-5 h-5 flex justify-center items-center rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                                    {likedMovies?.length || 0}
                                </div>
                            </NavLink>
                            <div className='hidden lg:flex'>
                                <LanguageSelector />
                            </div>
                        </div>
                        <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden mr-3" ripple={false} onClick={() => setOpenNav(!openNav)}>
                            {openNav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                    <MobileNav open={openNav}>
                        {navList}
                    </MobileNav>
                </Navbar>
            </>
    );
}

export default NavBar