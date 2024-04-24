import { useContext, useState } from "react";

// package imports
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

// project file imports
import { validateEmail, validatePassword } from "../assets/validationAndSanitization";
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function LoginForm() {
    const { authenticateUser, isAuthenticated } = useContext(
        AuthenticationContext
    );

    // state used to disable the btn when the form is in submission state
    
    const [btnDisabled, setBtnDisabled] = useState(isAuthenticated);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setBtnDisabled(true);
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());

        // we spread and mutate the data according to the checkbox input , i.e. the user wants the server to remember the token created for a longer period

        if(data.rememberMe){
            data = {...data,rememberMe: true};
        }
        else{
            data = {...data,rememberMe: false};
        }

        // Validation logic below, the email and password are validated before sending them to the server
        
        if (validateEmail(data.email) === false) {
        toast.error("Invalid email address", {
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
        return;
        }
        if (validatePassword(data.password) === false) {
        toast.error("Password length should be more than 8 characters", {
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: false,
        });
        return;
        }
        const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "login",
        data
        );

        // We check if the login was a success if not then we provide error feedback
        
        if (response.data.success === false) {
            toast.error(response.data.message, {
                pauseOnHover: false,
                autoClose: 4000,
                hideProgressBar: false,
                theme: "colored",
                closeOnClick: true,
            });
        }

        // The cookie expiration date is set according to the users selection
        // If the user selects to be remembered by the server the cookie is stored for a longer period
        
        if (response.data && response.data.token) {
            if(data.rememberMe === true){
                Cookies.set("authToken",response.data.token,{
                    secure: true,
                    expires: 30
                })
            }
            else{
                Cookies.set("authToken", response.data.token, {
                    secure: true,
                    expires: 1,
                });
            }

        // context function used to maintain an authentication state
        
        authenticateUser();
        toast.success("Logged in successfully", {
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

    return (
        <div className="w-screen h-screen bg-slate-800 flex items-center justify-center">
        <form
            method="post"
            onSubmit={handleSubmit}
            className="bg-slate-100 flex flex-col h-auto w-[40%] p-8 rounded-lg max-lg:w-[90%] max-lg:p-3"
        >
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            name="email"
            id="email"
            required
            className="py-1 pl-2 bg-slate-300 rounded-md"
            />
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            name="password"
            id="password"
            className="py-1 pl-2 bg-slate-300 rounded-md"
            />
            <div className="flex items-center gap-2 py-3">
                <input type="checkbox" name="rememberMe" className="w-4 h-4 cursor-pointer"/>
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button
            className="bg-stone-800 text-stone-100 my-2 w-[20%] mx-auto p-4 rounded-lg max-md:w-24"
            disabled={btnDisabled}
            >
            Login
            </button>
            <p className="text-center mt-2 text-lg">
            Not a member?
            <Link
                to="/signup"
                className="text-lg ml-1 transition-colors duration-300 hover:text-sky-500"
            >
                Signup now
            </Link>
            </p>
        </form>
        </div>
    );
}
