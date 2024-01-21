import { Form, Link, redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";

export default function SignupForm(){

    return (
        <div className="w-full h-[90%] bg-slate-800 flex items-center justify-center">
            <Form method="post" className="bg-slate-100 flex flex-col h-[45%] w-[40%] p-8 rounded-lg max-lg:h-[45%] max-lg:w-[80%]">
                <label htmlFor="name" required>Name:</label>
                <input type="text" name="name" id="name" className="p-1 bg-slate-300" autoComplete="off"/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required className="p-1 bg-slate-300" autoComplete="off"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="p-1 bg-slate-300"/>
                <div className="flex">
                    <button type="button" className="bg-stone-800 text-stone-100 mt-6 w-[20%] mx-auto p-4 rounded-lg max-md:w-[40%]"><Link to='/'>Home</Link></button>
                    <button className="bg-stone-800 text-stone-100 mt-6 w-[20%] mx-auto p-4 rounded-lg max-md:w-[40%]">Register</button>
                </div>
            </Form>
        </div>
    );
}

export async function action({request}){
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'signup',data);
    if(response.data && response.data.token){
        Cookies.set('authToken',response.data.token,{secure:true,expires: 24});
    }
    return redirect('/blogs');
}