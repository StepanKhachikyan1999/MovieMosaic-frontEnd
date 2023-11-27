import React, {ReactNode} from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import MobileFooter from "./Footer/MobileFooter";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className='bg-main text-white'>
            <Navbar/>
            {children}
            <Footer/>
            {/* mobile footer */}
            <MobileFooter/>
        </div>
    );
};

export default Layout;
