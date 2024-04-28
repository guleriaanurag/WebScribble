import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify'
import Cookies from "js-cookie";
import axios from "axios";
import { MdOutlineEdit } from 'react-icons/md'

import PostInteraction from "./PostInteractions";
import { sanitizeBlog } from "../assets/validationAndSanitization";
import { AuthenticationContext } from "../store/AuthenticationContext";
import CommentWrapper from "./CommentWrapper";
import { ModalContext } from "../store/ModalContextProvider";
import noImage from '../assets/noImage.png';

export default function BlogLandingPage(){
    const data = useLoaderData();

    const sanitizedContent = sanitizeBlog(data.content);
    const {isAuthenticated} = useContext(AuthenticationContext);
    const { commentModalState } = useContext(ModalContext);
    const[isEditable,setIsEditable] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        let id=null;
        if(Cookies.get('authToken')!==undefined){
            const {userId} = jwtDecode(Cookies.get('authToken'));
            id = userId;
        }
        if(isAuthenticated===false){
            setIsEditable(false);
        }
        if(id===data.author._id){
            setIsEditable(true);
        }
    },[isAuthenticated,commentModalState])
    
    function handleDeleteBlog(){
        const confirmation = confirm('Are you sure ? This blog will be deleted permanently.')
        const deleteBlog = async()=>{
            const response = await axios.delete(import.meta.env.VITE_BACKEND_URL+`blog/${data._id}`,{
                headers:{
                    Authorization:  `Bearer ${Cookies.get('authToken')}`
                }
            });
            if(response.data.success===true){
                toast.success(response.data.message,{
                    pauseOnHover: false,
                    theme: 'colored',
                    hideProgressBar: false,
                    progress: undefined,
                    closeOnClick: true
                })
            }
            else{
                toast.error(response.data.message,{
                    theme:'colored',
                    pauseOnHover: false,
                    hideProgressBar: false,
                    progress: undefined,
                    closeOnClick: true
                })
            }
            navigate('/blogs');
        }
        if(confirmation===true){
            deleteBlog();
        }
    }
    
    return(
        <div className="h-full w-full px-6 flex flex-col items-center">
            <h1 className="heading text-center text-3xl p-4">{data.title}</h1>
            {isEditable === true && (
                <div className="my-4 w-[80%] flex justify-end text-lg max-md:my-2">
                    <Link to='edit-blog'><button className="text-sky-500 bg-slate-800 w-20 p-2 rounded-lg hover:text-sky-400 hover:bg-slate-600"> <MdOutlineEdit className="inline"/> Edit</button></Link>
                    <button className="pl-4 hover:text-red-700" onClick={handleDeleteBlog}>Delete</button>
                </div>
            )}
            {data.imageName && (
            <img 
                src={`${import.meta.env.VITE_BACKEND_URL}image/${data.imageName}`} 
                alt={data.title} 
                onError={(e)=>{
                    e.target.onerror = null;
                    e.target.src = noImage;
                }}
                className="w-[80%] h-[80%] object-contain max-lg:object-fill max-md:w-[90%] max-md:h-[70%]"/>
            )}
            <div className="blog-content mt-10 px-40 max-lg:px-5" dangerouslySetInnerHTML={{__html: sanitizedContent}}></div>
            <PostInteraction />
            <CommentWrapper comments={data.comments}/>
        </div>
    );
}

export async function loader({params:{blogId}}){
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`blog/${blogId}`);
    if(response.data.sucess === false){
        alert(response.data.message);
    }
    return response.data.data;
}