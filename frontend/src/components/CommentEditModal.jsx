import { useState, useContext, useEffect, useRef } from "react";

import { useNavigate, useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify'

import { ModalContext } from "../store/ModalContextProvider";
import { AuthenticationContext } from "../store/AuthenticationContext";
import Cookies from "js-cookie";


export default function CommentEditModal(){
    
    const commentModal = useRef(null);
    const navigate = useNavigate();

    // params defined in the router routes
    const { blogId,commentId } = useParams();
    const data = useLoaderData();

    const { commentEditModalState, toggleCommentEditModalState } = useContext(ModalContext);
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    const [ btnIsDisabled, setBtnIsDisabled ] = useState(!isAuthenticated);
    const [ comment, setComment ] = useState(data?.userComment || '');

    useEffect(()=>{
        setBtnIsDisabled(!isAuthenticated)
        if(commentModal){
            if(commentEditModalState){
                commentModal.current.showModal();
            }
            else{
                commentModal.current.close();
            }
        }
    },[isAuthenticated,commentEditModalState])

    function handleKeyDown(e){
        if(e.key==='Escape'){
            handleModalClose();
        }
    }

    function handleModalClose(){
        toggleCommentEditModalState();
        navigate(`/blogs/blog/${blogId}`);
    }

    function handleCommentChange(e){
        setComment(e.target.value);
    }

    async function handleCommentFormSubmit(){
        setBtnIsDisabled(true);
        const response = await axios.patch(import.meta.env.VITE_BACKEND_URL+`blog/${blogId}/comment/${commentId}`,{userComment:comment},{
            headers:{
                Authorization: `Bearer ${Cookie.get('authToken')}`
            }
        })
        if(response.data.success === true){
            toast.success(response.data.message,{
                theme: 'light',
                pauseOnHover: false,
                closeOnClick: true,
                autoClose: 3000
            })
        }
        else{
            toast.error(response.data.message,{
                theme: 'light',
                pauseOnHover: false,
                closeOnClick: true,
                autoClose: 3500
            })
        }
        setComment('');
        setBtnIsDisabled(false);
        toggleCommentEditModalState();
        navigate(`/blogs/blog/${blogId}`);
    }

    return (
        <dialog ref={commentModal} className="w-[50vw] h-[60vh] rounded-2xl max-lg:h-[47vh] max-lg:w-[80vw]" onKeyDown={(e)=>handleKeyDown(e)}>
            <button className="absolute top-4 right-2 p-2 outline-none text-2xl" onClick={handleModalClose}>x</button>
            <div className="h-full w-full px-10 pt-14 pb-8 flex flex-col">
                <textarea name="comment" cols="20" rows="10" value={comment} onChange={(e)=>{handleCommentChange(e)}} className="w-full p-2 outline-none border-2 border-stone-600 rounded-lg" placeholder="Comment..."></textarea>
                <button className="mr-auto ml-auto mt-auto py-3 px-4 border-[1.5px] border-stone-600 rounded-lg hover:bg-stone-400 transition-colors duration-300" disabled={btnIsDisabled}onClick={handleCommentFormSubmit}>Update</button>
            </div>
        </dialog>
    );
}


export async function loader({params:{commentId}}){
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`fetch-comment/${commentId}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`
        }
    });
    return response.data;
}