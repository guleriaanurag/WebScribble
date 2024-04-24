// package imports
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project file imports
import Header from "../components/Header";

export default function HomePage() {
    return (
        <>
            <Header />
            <ToastContainer/>
            <Outlet />
        </>
    )
}