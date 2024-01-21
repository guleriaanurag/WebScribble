import { useParams,useLoaderData, Link } from "react-router-dom";
import axios from 'axios';
import BlogCards from "../components/BlogCards";

export default function CategoryBlogs(){
    const data = useLoaderData();
    const { category } = useParams();

    return(
        <>
            <h3 className="heading text-3xl p-4 text-center">{category} Blogs</h3>
            {data.length <= 0 && (
                <>
                    <p className="text-center mt-24">No blogs available</p>
                    <p className="text-center"><Link to='post' className="text-sky-600 underline animate-pulse">Would you like to contribute</Link></p>
                </>
            )}
            <div className="grid grid-cols-4 px-10 mt-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-3">
                {data.map((d)=>{
                    return <BlogCards key={d._id} data={d}/>
                })}
            </div>
        </>
    );
}

export async function loader({params}){
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(url+`blogs/${params.category}`);
    return response.data.data;
}   