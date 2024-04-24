import { useNavigate } from "react-router-dom";

export default function BlogCard({data}){
    
    let blogId = data._id;
    const navigate = useNavigate();

    function openBlogPage(){
        navigate(`/blogs/blog/${blogId}`);
    }

    return(
        <div onClick={openBlogPage} className="w-[300px] h-[300px] cursor-pointer text-center mx-4 my-6 max-md:my-8 p-5 bg-slate-800 text-slate-100 rounded-xl shadow-[rgba(0,0,15,0.5)_10px_15px_10px_10px] transition ease-in-out duration-300 hover:shadow-[rgba(0,0,15,0.5)_10px_15px_10px_5px] max-md:mx-auto">
            <img src={`${import.meta.env.VITE_BACKEND_URL}image/${data.imageName}`} alt={data.title} className="h-[50%] w-full object-cover rounded-lg overflow-hidden"/>
            <h2 className="text-sky-600 text-md mt-2 overflow-hidden">{data.title}</h2>
            <div className="flex justify-around items-end h-14">
                {data.category!=='All' && <h3>{data.category} Blog</h3>}
                <p className="text-right align-text-bottom">by {data.author.name}</p>
            </div>
        </div>
    );
}