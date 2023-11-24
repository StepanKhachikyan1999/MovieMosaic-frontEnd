import React, { ReactNode } from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='bg-main text-white'>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
