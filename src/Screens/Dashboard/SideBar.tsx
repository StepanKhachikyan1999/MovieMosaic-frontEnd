import React, {ReactNode} from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt, FaUsers } from 'react-icons/fa'
import { RiLockPasswordLine, RiLogoutCircleLine, RiMovie2Fill } from 'react-icons/ri'
import { HiViewGridAdd } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import Layout from '../../Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../Redux/Actions/userActions'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

interface Link {
    name: string;
    link: string;
    icon: ReactNode;
}

interface SideBarProps {
    children: ReactNode;
}

function SideBar({children}: SideBarProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation()
    const { userInfo } = useSelector((state: any) => state.userLogin);

    // logout
    const logoutHandler = () => {
        // @ts-ignore
        dispatch(logoutAction());
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const SideLinks: Link[] = userInfo?.isAdmin
        ? [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BsFillGridFill/>,
            },
            {
                name: "Movies List",
                link: "/movieslist",
                icon: <FaListAlt/>,
            },
            {
                name: "Add Movie",
                link: "/addmovie",
                icon: <RiMovie2Fill/>,
            },
            {
                name: "Categories",
                link: "/categories",
                icon: <HiViewGridAdd/>,
            },
            {
                name: "Users",
                link: "/users",
                icon: <FaUsers/>,
            },
            {
                name: "Update Profile",
                link: "/profile",
                icon: <FiSettings/>,
            },
            {
                name: "Favorites Movies",
                link: "/favorites",
                icon: <FaHeart/>,
            },
            {
                name: "Change Password",
                link: "/password",
                icon: <RiLockPasswordLine/>,
            },
        ]
        : userInfo
            ? [
                {
                    name: "updateProfile",
                    link: "/profile",
                    icon: <FiSettings/>,
                },
                {
                    name: "favoritesMovies",
                    link: "/favorites",
                    icon: <FaHeart/>,
                },
                {
                    name: "changePassword",
                    link: "/password",
                    icon: <RiLockPasswordLine/>,
                },
            ]
            : [];

    const active = "bg-dryGray text-subMain";
    const hover = "hover:text-white hover:bg-main";
    const inActive =
        "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
    const Hover = ({isActive}: { isActive: boolean }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        {/* SideBar Links */}
                        {SideLinks.map((link, index) => (
                            <NavLink to={link.link} key={index} className={Hover}>
                                {link.icon} <p>{t(link.name)}</p>
                            </NavLink>
                        ))}
                        <button
                            onClick={logoutHandler}
                            className={`${inActive} ${hover} w-full `}
                        >
                            <RiLogoutCircleLine/> {t("logOut")}
                        </button>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="10"
                        data-aos-offset="200"
                        className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SideBar

// new
