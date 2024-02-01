import { Link, useLoaderData } from "react-router-dom";
import axios from 'axios';
import BlogCard from "../components/BlogCard";
import { useContext,useEffect } from "react";
import { AuthenticationContext } from "../store/AuthenticationContext";
import Cookies from "js-cookie";

export default function Blogs(){
    const {data} = useLoaderData();

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

    return(
        <div>
            <h3 className="heading text-3xl p-4 text-center">Blogs</h3>
            {data.length <= 0 && (
                <>
                    <p className="text-center">No blogs available</p>
                    <Link to='post' className="text-sky-600 underline animate-pulse">Would you like to contribute</Link>
                </>
            )}
            <div className="grid grid-cols-4 px-10 mt-6 pb-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-3">
                {data.map((d)=>{
                    return <BlogCard key={d._id} data={d}/>
                })}
            </div>
        </div>
    );
}

export async function loader(){
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(url+'blogs');
    return response.data;
}