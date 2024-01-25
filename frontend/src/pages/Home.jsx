import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    return (
        <>
            <Header />
            <ToastContainer/>
            <Outlet />
        </>
    )
}