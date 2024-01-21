import { useNavigate } from "react-router-dom";

export default function BlogCards({data}){
    
    let blogId = data._id;
    const navigate = useNavigate();

    function openBlogPage(){
        console.log(blogId);
        navigate(`/blogs/blog/${blogId}`);
    }

    return(
        <div onClick={openBlogPage} className="w-[300px] h-[300px] text-center mx-4 my-4 p-5 bg-slate-800 text-slate-100 rounded-xl shadow-2xl shadow-slate-800">
            <img src={`${import.meta.env.VITE_BACKEND_URL}image/${data.imageName}`} alt={data.title} className="h-[50%] w-full object-cover rounded-lg overflow-hidden"/>
            <h2 className="text-md mt-2 overflow-hidden whitespace-nowrap text-ellipsis line-clamp-0">{data.title}</h2>
            <p className="overflow-hidden text-ellipsis line-clamp-2">{data.content}</p>
            <div className="flex justify-around items-end h-14">
                <h3>Categoty: {data.category}</h3>
                <p className="text-right align-text-bottom">by {data.author.name}</p>
            </div>
        </div>
    );
}