import { useLoaderData, Link } from "react-router-dom";
import axios from 'axios';
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";

export default function CategoryBlogs(){
    const data = useLoaderData();

    return(
        <>
            <h3 className="heading text-3xl p-4 text-center"> Blogs</h3>
            {data.length <= 0 && (
                <>
                    <p className="text-center mt-24">No blogs available</p>
                    <p className="text-center"><Link to='/blogs/post' className="text-sky-600 underline animate-pulse">Would you like to contribute</Link></p>
                </>
            )}
            <div className="grid grid-cols-4 px-10 mt-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-3">
                {data.map((d)=>{
                    return <BlogCard key={d._id} data={d}/>
                })}
            </div>
        </>
    );
}

export async function loader({params}){
    const url = import.meta.env.VITE_BACKEND_URL;
    const myPromise = new Promise((resolve,reject)=>{
        axios.get(url+`blogs/${params.category}`)
        .then((res)=>resolve(res.data.data || []))
        .catch((err)=>reject(err))
    })
    await toast.promise(myPromise,{
        pending: 'Please wait, while we fetch the blogs',
        success: 'Success',
        error: 'There was an error fetching the blogs'
    },{
        pauseOnHover: false,
        closeOnClick: true,
        autoClose:1500
    })
    return myPromise;
}   