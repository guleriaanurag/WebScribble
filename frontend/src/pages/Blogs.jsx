import { Link, useLoaderData } from "react-router-dom";
import axios from 'axios';
import BlogCard from "../components/BlogCard";

export default function Blogs(){
    const {data} = useLoaderData();

    return(
        <div>
            <h3 className="heading text-3xl p-4 text-center">Blogs</h3>
            {data.length <= 0 && (
                <>
                <p className="text-center mt-24">No blogs available</p>
                <p className="text-center"><Link to='post' className="text-sky-600 underline animate-pulse">Would you like to contribute</Link></p>
            </>
            )}
            <div className="grid grid-cols-4 px-10 mt-6 pb-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-3">
                {data.map((d)=>{
                    return <BlogCard key={d._id} data={d}/>
                })}
            </div>
        </div>
    );
}

export async function loader(){
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(url+'blogs');
    return response.data;
}