import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { MdDelete,MdEdit } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify'

import { formatTimeDifference } from '../assets/helperFunctions';
import { AuthenticationContext } from '../store/AuthenticationContext';
import { ModalContext } from '../store/ModalContextProvider';
import logo from '../assets/defaultLogo.jpg';

export default function Comment({comment}){    
    
    const navigate = useNavigate();
    
    // state to check if the comment is editable
    const [isEditable,setIsEditable] = useState(false);

    // contexts
    const { isAuthenticated } = useContext(AuthenticationContext);
    const { toggleCommentEditModalState } = useContext(ModalContext);
    
    // side-effect to check if the logged in user has created the comment

    useEffect(()=>{
        let id = null;
        if(Cookies.get('authToken')!==undefined){
            const { userId } = jwtDecode(Cookies.get('authToken'));
            id = userId;
        }
        if(isAuthenticated===false){
            setIsEditable(false);
        }
        if(id===comment.author._id){
            setIsEditable(true);
        }
    },[isAuthenticated])

    // calculating time difference of current time and comment creationtime
    const timeDiff = formatTimeDifference(comment.createdAt);

    // function to handle comment deletion

    function handleDelteComment(id){
        const confirmation = window.confirm('Are you sure?')
        
        const hrefArray = window.location.href.split('/');
        const blogId = hrefArray[hrefArray.length - 1];
        
        const deleteComment = async()=>{
            const response = await axios.delete(import.meta.env.VITE_BACKEND_URL+`blog/${blogId}/comment/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get('authToken')}`
                }
            });
            if(response.data.success === true){
                toast.success(response.data.message,{
                    pauseOnHover: false,
                    theme: 'colored',
                    hideProgressBar: false,
                    progress: undefined,
                    closeOnClick: true
                })
            }
            else{
                toast.error(response.data.message || 'An error occured',{
                    pauseOnHover: false,
                    theme: 'colored',
                    hideProgressBar: false,
                    progress: undefined,
                    closeOnClick: true
                })
            }
            navigate(`/blogs/blog/${blogId}`,{replace: true})
        }

        if(confirmation===true){
            deleteComment();
        }
    }

    // function handling comment edit modal form opening

    function handleCommentEditModal(){
        toggleCommentEditModalState();
        navigate(`edit-comment/${comment._id}`);
    }

    return(
        <div className="py-2 px-3 my-5 border border-slate-600 rounded-lg w-[50%] max-md:w-[90%]">
            <div className='flex w-full items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full border w-9 h-9'>
                        <img src={logo} alt="" className='rounded-full'/>
                    </div>
                    <h4 className="font-bold">{comment.author.name}</h4>
                </div>
                {isEditable === true &&  (<div className='flex gap-4 items-center text-2xl'>
                    <MdDelete className='hover:text-red-600 cursor-pointer transition-colors duration-300' onClick={()=>handleDelteComment(comment._id)}/>
                    <MdEdit className='cursor-pointer hover:text-slate-600' onClick={handleCommentEditModal}/>
                </div>)}
            </div>
            <p className="text-sm">{timeDiff}</p>
            <p className="mt-3">{comment.userComment}</p>
        </div>
    );
}