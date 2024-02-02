import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "../components/Header";
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