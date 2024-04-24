import { useEffect } from "react";

// package imports
import { Outlet } from "react-router-dom"

// project file imports
import Menu from "../components/Menu";

export default function BlogsLayout() {

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    },[])

    return (
        <div className="hide-scroll overflow-scroll h-screen">
            <Menu />
            <main className="w-screen h-screen">
                <Outlet />
            </main>
        </div>
    );
}