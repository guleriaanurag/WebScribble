import { toast } from 'react-toastify'
import { Form, Link, redirect } from "react-router-dom";
import axios from 'axios';

export default function LoginForm(){

    return(
        <div className="w-full h-[90%] bg-slate-800 flex items-center justify-center">
            <Form method="post" className="bg-slate-100 flex flex-col h-[50%] w-[40%] p-8 rounded-lg max-lg:h-[45%] max-lg:w-[90%]">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required className="p-1 bg-slate-300" autoComplete="off"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="p-1 bg-slate-300"/>
                <button className="bg-stone-800 text-stone-100 mt-6 w-[20%] mx-auto p-4 rounded-lg max-md:w-24">Login</button>
                <Link to='/signup' className="underline align-baseline text-lg mt-2">Create an account</Link>
            </Form>
        </div>
    );
}

export async function action({request}){
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'login',data);
    if(response.data.success === false){
        toast.error(response.data.message,{
            pauseOnHover:false,
            autoClose: 4000,
            hideProgressBar: false,
            theme: 'colored',
            closeOnClick: true
        })
        return redirect('..');
    }
    if(response.data && response.data.token){
        Cookies.set('authToken',response.data.token,{secure:true,expires: 1});
        toast.success('Logged in successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            progress: undefined,
            theme: "colored",
            });
    }
    return redirect('/blogs');
}