import { useEffect } from "react";
import { Outlet } from "react-router-dom"
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