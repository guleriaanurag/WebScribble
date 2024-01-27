import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AuthenticationContext } from "../store/AuthenticationContext";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import Cookies from "js-cookie";

export default function HomePage() {
    
    const { authenticateUser } = useContext(AuthenticationContext);
    
    useEffect(()=>{
        async function authenticateFromCookie(){
            const cookie = Cookies.get('authToken');
            if(cookie!==undefined){
                authenticateUser();
            }
        }
        authenticateFromCookie();
    },[authenticateUser])

    return (
        <>
            <Header />
            <ToastContainer/>
            <Outlet />
            <Footer />
        </>
    )
}