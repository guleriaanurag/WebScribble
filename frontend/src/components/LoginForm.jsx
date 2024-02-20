import { toast } from 'react-toastify'
import { Link,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { validateEmail, validatePassword } from '../assets/validationAndSanitization';
import { useContext, useState } from 'react';
import { AuthenticationContext } from '../store/AuthenticationContext';

export default function LoginForm(){

    const[btnDisabled,setBtnDisabled] = useState(false);

    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthenticationContext);

    async function handleSubmit(e){
        e.preventDefault();
        setBtnDisabled(true)
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if(validateEmail(data.email)===false){
            toast.error('Invalid email address',{
                theme:'colored',
                closeOnClick: true,
                pauseOnHover: false
            })
            return;
        }
        if(validatePassword(data.password)===false){
            toast.error('Password length should be more than 8 characters',{
                theme:'colored',
                closeOnClick: true,
                pauseOnHover: false
            })
            return;
        }
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'login',data);
        if(response.data.success === false){
            toast.error(response.data.message,{
                pauseOnHover: false,
                autoClose: 4000,
                hideProgressBar: false,
                theme: 'colored',
                closeOnClick: true
            })
        }
        if(response.data && response.data.token){
            Cookies.set('authToken',response.data.token,{secure:true,expires:1});
            authenticateUser();
            toast.success('Logged in successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "colored",
            });
        }
        e.target.reset();
        navigate(-1);
    }

    return(
        <div className="w-screen h-screen bg-slate-800 flex items-center justify-center">
            <form method="post" onSubmit={handleSubmit} className="bg-slate-100 flex flex-col h-[40%] w-[40%] p-8 rounded-lg max-lg:h-[38%] max-lg:w-[90%] max-lg:p-3">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required className="py-1 pl-2 bg-slate-300 rounded-md"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="py-1 pl-2 bg-slate-300 rounded-md"/>
                <button className="bg-stone-800 text-stone-100 mt-6 w-[20%] mx-auto p-4 rounded-lg max-md:w-24" disabled={btnDisabled}>Login</button>
                <Link to='/signup' className="underline align-baseline text-lg mt-2">Create an account</Link>
            </form>
        </div>
    );
}