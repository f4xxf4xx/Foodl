import { CssBaseline } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "..";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Wrapper } from "./Styles/Wrapper";

const MainLayout = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const auth = useSelector((state: ApplicationState) => state.firebase.auth);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <Wrapper>
            <CssBaseline />
            <Header toggleDrawer={toggleDrawer} />
            {!auth.isEmpty &&
                <Sidebar
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                />
            }
            <div className="main">
                {props.children}
            </div>
        </Wrapper>
    );
}

export default MainLayout;
