import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../store/AuthenticationContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Header(){

    const {isAuthenticated,logoutUser} = useContext(AuthenticationContext);

    function handleLogout(){
        Cookies.remove('authToken');
        toast.error('User logged out',{
            pauseOnHover:false,
            autoClose: 4000,
            hideProgressBar: false,
            theme: 'colored',
            closeOnClick: true
        });
        logoutUser();
    }

    return(
        <header className="header sticky top-0 w-full h-[10%] z-[51] bg-slate-800 flex justify-between py-2 px-6 max-lg:h-[15%]">
            <label className="heading flex items-center justify-center text-4xl h-full"><Link to='/'> Web Scribbles </Link></label>
            <div className="flex items-center">
                {isAuthenticated===false && (
                    <Link to='/login'><button className="px-5 outline-none bg-slate-100 rounded-xl text-lg h-12 max-lg:h-[60%]">SignIn</button></Link>
                    )}
                {isAuthenticated===true && (
                    <button className="px-5 outline-none flex items-center justify-center bg-slate-100 rounded-xl text-lg h-12 max-lg:h-[60%]" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    );
}