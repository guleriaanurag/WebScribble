import { useState, useEffect, useContext } from "react";

// package imports
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// project file imports
import module from "../assets/toolbarOptions";
import { AuthenticationContext } from "../store/AuthenticationContext";

export default function CreateBlog() {
    
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    // state for storing value for react-quill
    const [value, setValue] = useState("");
    
    // state for disabling form button if not authenticated or in submission state
    const [btnDisabled, setBtnDisabled] = useState(!isAuthenticated);
    const navigate = useNavigate();

    // A check to see if the user is logged in
    // If not the user is sent to the login page
    useEffect(() => {
        if (Cookies.get("authToken") === undefined) {
            toast.error("You need to login first", {
            theme: "colored",
            pauseOnHover: false,
            closeOnClick: true,
            autoClose: true,
            progress: undefined,
        });
        navigate("/login");
        }
    }, [navigate]);

    // function to handle form submission 
    async function handleCreateBlog(e) {
        e.preventDefault();
        setBtnDisabled(true);
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData.entries());
        
        // the author field is added as the server checks and appends the value later
        // the content is added because react-quill data is handled seperately
        data = { ...data, author: "", content: value };
        const cookie = Cookies.get("authToken");
        const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "blog",
        data,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie}`,
            },
        }
        );

        // checking for server reponse and providing user feedback
        if (response.data.success === true) {
            toast.success("The blog is posted", {
                theme: "colored",
                pauseOnHover: false,
                closeOnClick: true,
                autoClose: true,
                progress: undefined,
            });
        } 
        else {
            toast.error(
                response.data.message || "An error occured while posting the blog",
                {
                theme: "colored",
                pauseOnHover: false,
                closeOnClick: true,
                autoClose: true,
                progress: undefined,
                }
            );
        }
        navigate("/blogs");
    }

    return (
        <div className="form-div w-full h-full flex justify-center mt-9">
        <form
            method="POST"
            onSubmit={handleCreateBlog}
            encType="multipart/form-data"
            className="bg-slate-700 flex flex-col p-7 h-[85%] w-[95%] gap-3 rounded-lg max-lg:h-[84%] max-lg:w-[90%]"
        >
            <label htmlFor="title" className="text-stone-100">
            Title:
            </label>
            <input
                type="text"
                name="title"
                id="title"
                className="outline-none pl-1 py-1 rounded-lg"
            />
            <label htmlFor="image" className="text-stone-100">Image:</label>
            <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="max-md:h-10"
            />
            <label className="text-stone-100">Content:</label>
            <ReactQuill
                theme="snow"
                modules={module}
                value={value}
                onChange={setValue}
                placeholder="Content..."
                className="bg-slate-100 h-[40%] max-md:h-[33%] overflow-scroll hide-scroll"
            ></ReactQuill>
            <br />
            <label
                htmlFor="category"
                className="text-stone-100 mt-auto max-lg:mt-[10%]"
            >
            Category:
            </label>
            <select
                name="category"
                id="category"
                className="rounded-lg outline-none pl-3 py-1"
            >
            <option value="Category:" disabled></option>
            <option value="All">All</option>
            <option value="Science">Science</option>
            <option value="Music">Music</option>
            <option value="Games">Games</option>
            <option value="Fiction">Fiction</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            </select>
            <button
                className="p-1 mt-2 w-[15%] mx-auto rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-400 max-md:w-[35%]"
                disabled={btnDisabled}
            >
            Post
            </button>
        </form>
        </div>
    );
}
