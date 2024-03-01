import { useContext, useState } from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../store/AuthenticationContext";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import module from "../assets/toolbarOptions";

export default function EditBlogForm() {
    const { isAuthenticated } = useContext(AuthenticationContext);

    const data = useRouteLoaderData("landing-loader");
    const [value, setValue] = useState(data.content);
    const [btnDisabled, setBtnDisabled] = useState(!isAuthenticated);
    const navigate = useNavigate();

    async function handleBlogUpdation(e) {
        e.preventDefault();
        setBtnDisabled(true);
        const formData = new FormData(e.target);
        const updatedFormData = Object.fromEntries(formData.entries());
        let updatedData = { ...data };
        const cookie = Cookies.get("authToken");
        if (updatedFormData.image.name === "") {
        updatedData = { ...updatedData, content: value };
        } else {
        updatedData = {
            ...updatedData,
            content: value,
            image: updatedFormData.image,
        };
        }
        const response = await axios.patch(
        import.meta.env.VITE_BACKEND_URL + `blog/${data._id}`,
        updatedData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie}`,
            },
        }
        );

        if (response.data.success === true) {
        toast.success(response.data.message, {
            pauseOnHover: false,
            closeOnClick: true,
            theme: "colored",
            hideProgressBar: false,
            progress: undefined,
        });
        } else {
        toast.error(response.data.message, {
            pauseOnHover: false,
            closeOnClick: true,
            theme: "colored",
            hideProgressBar: false,
            progress: undefined,
        });
        }
        navigate("/blogs");
    }

    return (
        <div className="form-div w-full h-full flex justify-center mt-9">
        <form
            method="PATCH"
            onSubmit={handleBlogUpdation}
            encType="multipart/form-data"
            className="bg-slate-700 flex flex-col p-7 h-auto w-[90%] gap-3 rounded-lg max-lg:w-[90%]"
        >
            <label htmlFor="title" className="text-stone-100">
                Title:
            </label>
            <input
                type="text"
                name="title"
                id="title"
                className="outline-none pl-1 py-1 rounded-lg"
                defaultValue={data.title}
            />
            <label htmlFor="image" className="text-stone-100">
                Image:
            </label>
            <input type="file" name="image" id="image" accept="image/*" />
            <label htmlFor="content" className="text-stone-100">
                Content:
            </label>
            <ReactQuill
                theme="snow"
                modules={module}
                value={value}
                onChange={setValue}
                className="bg-slate-100 max-h-[50%] whitespace-pre-line overflow-scroll hide-scroll"
            ></ReactQuill>
            <button
                className="p-1 w-[20%] m-auto rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-400 max-md:w-[30%]"
                disabled={btnDisabled}
            >
            Update
            </button>
        </form>
        </div>
    );
}
