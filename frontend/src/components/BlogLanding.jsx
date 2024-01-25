import { useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

import Cookies from "js-cookie";
import axios from "axios";
import { MdOutlineEdit } from 'react-icons/md'

export default function BlogLandingPage(){
    const data = useLoaderData();
    let id = null;
    
    let isEditable=null;
    
    useEffect(()=>{
        if(Cookies.get('authToken')){
            const {userId} = jwtDecode(Cookies.get('authToken'));
            id = userId;
        }
        isEditable = id === data.author._id
    },[])

    function handleDeleteBlog(){
        const confirmation = confirm('Are you sure ? This blog will be deleted permanently.')
        const deleteBlog = async()=>{
            axios.delete(import.meta.env.VITE_BACKEND_URL+`blog/${id}`,{
                headers:{
                    Authorization:  `Bearer ${Cookies.get('authToken')}`
                }
            });
        }
        if(confirmation===true){
            deleteBlog();
        }
    }

    return(
        <div className="hide-scroll h-full w-full px-6 flex flex-col items-center overflow-scroll">
            <h1 className="heading text-center text-3xl p-4">{data.title}</h1>
            {isEditable === true && (
                <div className="my-4 w-[80%] flex justify-end text-lg max-md:my-2">
                    <button className="text-sky-500 bg-slate-800 w-20 p-2 rounded-lg hover:text-sky-400 hover:bg-slate-600"> <MdOutlineEdit className="inline"/> Edit</button>
                    <button className="pl-4 hover:text-red-700" onClick={handleDeleteBlog}>Delete</button>
                </div>
            )}
            <img src={`${import.meta.env.VITE_BACKEND_URL}image/${data.imageName}`} alt={data.title} className="w-[80%] h-[80%] object-contain max-lg:object-fill"/>
            <p className="mt-10 text-center px-40 max-lg:px-5">{data.content}</p>
        </div>
    );
}

export async function loader({params}){
    const{id} = params;
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`blog/${id}`);
    if(response.data.sucess === false){
        alert(response.data.message);
    }
    return response.data.data;
}