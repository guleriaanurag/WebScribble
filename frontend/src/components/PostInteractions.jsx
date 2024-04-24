// package imports
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaRegComment } from 'react-icons/fa';
import { useContext } from 'react';

// project file imports
import { ModalContext } from '../store/ModalContextProvider';
import { useNavigate } from 'react-router-dom';

export default function PostInteraction(){

    const {toggleCommentModalState} = useContext(ModalContext);
    const navigate = useNavigate();

    function handleCommentModal(){
        toggleCommentModalState();
        navigate('comment');
    }

    return (
        <div className='flex gap-4 mt-6 w-full px-40 max-lg:px-5'>
            <FaRegComment className='text-2xl cursor-pointer' onClick={handleCommentModal}/>
            <IoShareSocialOutline className='text-2xl cursor-pointer'/>
        </div>
    );
}