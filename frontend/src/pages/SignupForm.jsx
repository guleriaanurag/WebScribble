import { useContext, useState } from "react";

// package imports
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// project file imports
import { validateEmail, validatePassword } from "../assets/validationAndSanitization";
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function SignupForm() {
    const { authenticateUser, isAuthenticated } = useContext(
        AuthenticationContext
    );
    // state to disable button during form submission stage
    const [btnDisabled, setBtnDisabled] = useState(isAuthenticated);
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        setBtnDisabled(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // some validation logic performed on email and pass inputs before sending to the server

        if (validateEmail(data.email) === false) {
            toast.error("Invalid email address", {
                theme: "colored",
                pauseOnHover: false,
                closeOnClick: true,
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

        // post request sent to server after validation
        
        const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "signup",
        data
        );

        // checking if the server sent an ok response with a token
        if (response.data && response.data.token) {
            Cookies.set("authToken", response.data.token, {
                secure: true,
                expires: 24,
            });
            authenticateUser();
            toast.success("User registered", {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "colored",
            });
        }

        if (response.data.success === false) {
            toast.error(response.data.message, {
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "colored",
            });
        }

        navigate("/blogs");
    }

    return (
        <div className="w-screen h-screen bg-slate-800 flex items-center justify-center">
            <form
                method="post"
                onSubmit={handleSignUp}
                className="bg-slate-100 flex flex-col h-auto w-[40%] p-8 rounded-lg max-lg:w-[90%]"
            >
                <label htmlFor="name" required>
                Name:
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="py-1 px-2 bg-slate-300"
                    autoComplete="off"
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="py-1 px-2 bg-slate-300"
                    autoComplete="off"
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="py-1 px-2 bg-slate-300"
                />
                <div className="flex gap-14 justify-center">
                    <button
                        className="bg-stone-800 text-stone-100 mt-6 p-4 rounded-lg max-md:w-[40%]"
                        disabled={btnDisabled}
                    >
                        Register
                    </button>
                    <button
                        type="button"
                        className="bg-stone-800 text-stone-100 mt-6 p-4 rounded-lg max-md:w-[40%]"
                        disabled={btnDisabled}
                    >
                        <Link to="/">Cancel</Link>
                    </button>
                </div>
            </form>
        </div>
    );
}
