import { useContext, useEffect } from "react";

// package imports
import { Link} from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Headroom from 'react-headroom';

// project file imports
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function Header(){

    const {isAuthenticated,authenticateUser,logoutUser} = useContext(AuthenticationContext);

    // checking is user is logged in using a stored cookie
    // to display login, logout button respectively
    useEffect(()=>{
        if(Cookies.get('authToken')!==undefined){
            authenticateUser();
        }
    },[authenticateUser])

    function handleLogout(){
        Cookies.remove('authToken');
        toast('User logged out',{
            pauseOnHover:false,
            autoClose: 3000,
            hideProgressBar: true,
            theme: 'light',
            closeOnClick: true,
        });
        logoutUser();
    }

    return(
        <Headroom>
            <header className="header sticky top-0 w-full h-[10%] z-[51] bg-slate-800 flex justify-between py-2 px-6 max-lg:h-[15%]">
                <label className="heading flex items-center justify-center text-4xl h-full"><Link to='/'> Web Scribbles </Link></label>
                <div className="flex items-center">
                    {isAuthenticated===false && (
                        <Link to='/login' className="h-12 max-lg:h-[80%] max-md:h-[80%]"><button className="px-5 outline-none bg-slate-100 rounded-xl text-lg h-12 max-lg:h-full">SignIn</button></Link>
                        )}
                    {isAuthenticated===true && (
                        <button className="px-5 outline-none bg-slate-100 rounded-xl text-lg h-12 max-lg:h-[80%]" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </header>
        </Headroom>
    );
}