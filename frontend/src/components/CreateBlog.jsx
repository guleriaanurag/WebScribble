import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function CreateBlog(){
    
    const {isAuthenticated} = useContext(AuthenticationContext);
    
    return(
        <div className="form-div w-full h-full flex items-center justify-center">
            <Form method='POST' encType='multipart/form-data' className="bg-slate-700 flex flex-col p-7 w-[50%] gap-3 rounded-lg">
                <label htmlFor="title" className="text-stone-100">Title:</label>
                <input type="text" name="title" id="title"/>
                <label htmlFor="image" className="text-stone-100">Image:</label>
                <input type='file' name="image" id="image" accept='image/*' />
                <label htmlFor="content" className="text-stone-100">Content:</label>
                <textarea name="content" id="content" cols="20" rows="5" placeholder="Content...."></textarea>
                <label htmlFor="category" className="text-stone-100">Category:</label>
                <select name="category" id="category">
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
    } catch (error) {
        console.log(error);
    }
    return redirect('..');
}