import React from "react";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/Navbar";

function Layout({children}: any) {
    return (
        <>
            <div className="bg-main text-white">
                <NavBar/>
                {children}
                <Footer/>
                {/* mobile footer */}
                {/*<MobileFooter/>*/}
            </div>
        </>
    );
}

export default Layout;

// new