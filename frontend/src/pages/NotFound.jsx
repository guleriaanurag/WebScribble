import { Link } from "react-router-dom";
import { IoArrowBackCircle } from 'react-icons/io5';

import missingPageImage from '../assets/pageMissing.png';

export default function PageNotFound(){
    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-slate-700">
            <div className="w-[70%] h-[75%] bg-slate-600 rounded-lg flex flex-col items-center justify-evenly"> 
                <p className="heading text-9xl">404</p>
                <img src={missingPageImage} alt="" className="h-[30%]"/>
                <p className="text-stone-100 text-6xl">Oops! Page Not Found</p>
                <Link to='/' className="text-sky-500 text-4xl hover:animate-pulse text-center"> 
                    <div className="flex items-center justify-center gap-2">
                        <IoArrowBackCircle/> 
                        <p>Back to Home</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}