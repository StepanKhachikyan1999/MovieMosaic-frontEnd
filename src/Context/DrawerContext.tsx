import React, {createContext, useMemo, useState} from "react";

// @ts-ignore
export const SidebarContext = createContext();

function DrawerContext({children}: any) {
    const [mobileDrawer, setMobileDrawer] = useState(false);
    const [progress, setprogress] = useState(0);
    const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
    const value = useMemo(
        () => ({mobileDrawer, toggleDrawer, progress, setprogress}),
        [mobileDrawer, progress]
    );
    return (
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    );
}

export default DrawerContext

// new