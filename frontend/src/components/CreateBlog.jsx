import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../store/AuthenticationContext";
import { toast } from 'react-toastify'

export default function CreateBlog(){
    
    const {isAuthenticated} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(Cookies.get('authToken')===undefined){
            toast.error('You need to login first',{
                theme:'colored',
                pauseOnHover: false,
                closeOnClick: true,
                autoClose: true,
                progress: undefined
            })
            navigate('/login');
        }
    },[navigate])

    return(
        <div className="form-div w-full h-full flex items-center justify-center">
            <Form method='POST' encType='multipart/form-data' className="bg-slate-700 flex flex-col p-7 w-[50%] gap-3 rounded-lg max-lg:w-[90%]">
                <label htmlFor="title" className="text-stone-100">Title:</label>
                <input type="text" name="title" id="title" className="outline-none pl-1 py-1 rounded-lg"/>
                <label htmlFor="image" className="text-stone-100">Image:</label>
                <input type='file' name="image" id="image" accept='image/*'/>
                <label htmlFor="content" className="text-stone-100">Content:</label>
                <textarea name="content" id="content" cols="20" rows="5" placeholder="Content...." className="outline-none pl-1 py-1 rounded-lg"></textarea>
                <label htmlFor="category" className="text-stone-100">Category:</label>
                <select name="category" id="category" className="rounded-lg outline-none pl-1 py-1">
                    <option value="All">All</option>
                    <option value="Science">Science</option>
                    <option value="Music">Music</option>
                    <option value="Games">Games</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Technology">Technology</option>
                    <option value="Programming">Programming</option>
                </select>
                <button className="p-1 mt-2 w-[30%] mx-auto rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-400" disabled={!isAuthenticated}>Post</button>
            </Form>
        </div>
    );
}

export async function action({request}){
    const formData = await request.formData();
    let data = Object.fromEntries(formData.entries());
    data = {...data,author:''};
    const cookie = Cookies.get('authToken');
    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL+'blog',data,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${cookie}`
            }
        })
        toast.success('The blog is posted',{
            theme: 'colored',
            pauseOnHover: false,
            closeOnClick: true,
            autoClose: true,
            progress: undefined
        })
    } catch (error) {
        toast.error('An error occured while posting the blog',{
            theme: 'colored',
            pauseOnHover: false,
            closeOnClick: true,
            autoClose: true,
            progress: undefined
        });
    }
    return redirect('..');
}