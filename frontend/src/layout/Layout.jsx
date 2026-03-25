import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function Layout() {
    const [open, setOpen] = useState(true);
    const isMobile = window.innerWidth < 768;

    return (
        <div className="bg-s min-vh-100">

            <Header open={open} setOpen={setOpen} />

            <div
                style={{
                    marginLeft: isMobile ? '0px' : (open ? '250px' : '70px'),
                    transition: '0.3s'
                }}
            >
                <Outlet />
            </div>

        </div>
    );
}