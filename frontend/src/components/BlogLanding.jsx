import { useLoaderData } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import axios from "axios";

export default function BlogLandingPage(){
    const data = useLoaderData();
    let id = null;
    if(Cookies.get('authToken')){
        const {userId} = jwtDecode(Cookies.get('authToken'));
        id = userId;
    }

    const isEditable = id===data.author._id;
    console.log(id,data.author._id);

    return(
        <div className="h-full w-full px-6 flex flex-col items-center overflow-scroll">
            <h1 className="heading text-center text-3xl p-4">{data.title}</h1>
            <img src={`${import.meta.env.VITE_BACKEND_URL}image/${data.imageName}`} alt={data.title} className="w-[80%] h-[80%] object-contain"/>
            <p className="mt-10 text-center px-40 max-lg:px-5">{data.content}</p>
        </div>
    );
}

export async function loader({params}){
    const{id} = params;
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`blog/${id}`);
    if(response.data.sucess === false){
        alert(response.data.message);
    }
    return response.data.data;
}