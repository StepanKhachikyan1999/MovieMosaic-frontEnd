import Drawer from "rc-drawer";
import React from "react";

function MainDrawer({children, drawerOpen, closeDrawer}: any) {
    return (
        <Drawer
            open={drawerOpen}
            onClose={closeDrawer}
            // @ts-ignore
            handler={false}
            level={null}
            placement="right"
        >
            {children}
        </Drawer>
    );
}

export default MainDrawer;
