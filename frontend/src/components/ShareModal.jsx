import { useContext, useEffect, useRef } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import { ShareSocial } from 'react-share-social';

import { ModalContext } from "../store/ModalContextProvider";
import { AuthenticationContext } from "../store/AuthenticationContext";


export default function ShareModal(){
    
    const shareModal = useRef(null);
    const navigate = useNavigate();

    const { blogId } = useParams();

    const { shareModalState, toggleShareModalState } = useContext(ModalContext);
    const { isAuthenticated } = useContext(AuthenticationContext);
    

    useEffect(()=>{
        if(shareModal){
            if(shareModalState){
                shareModal.current.showModal();
            }
            else{
                shareModal.current.close();
            }
        }
    },[isAuthenticated,shareModalState])

    function handleKeyDown(e){
        if(e.key==='Escape'){
            handleModalClose();
        }
    }

    function handleModalClose(){
        toggleShareModalState();
        navigate(`/blogs/blog/${blogId}`);
    }

    // const style = {
    //     root: {
    //         borderRadius: 3,
    //         border: 0,
    //         color: 'white',
    //         height: '100%',
    //         width: '100%',
    //         margin: 'auto',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'space-evenly',
    
    //     },
    //     copyContainer: {
    //         border: '0px',
    //         background: 'rgb(0,0,0,0.7)',
    //     }
    // };

    
    // const style = {
    //     root: {
    //         borderRadius: 3,
    //         border: 0,
    //         color: 'white',
    //         height: '100%',
    //         width: '100%',
    //         margin: 'auto',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'space-evenly',
    
    return (
        <dialog ref={shareModal} className="w-[40vw] h-[40vh] rounded-2xl max-lg:h-[43vh] max-lg:w-[80vw]" onKeyDown={(e)=>handleKeyDown(e)}>
            <button className="absolute top-4 right-4 p-2 outline-none text-2xl z-50" onClick={handleModalClose}>x</button>
            <ShareSocial 
                url={window.location.origin+`/blogs/blog/${blogId}`}
                socialTypes={['facebook','twitter','whatsapp','reddit','linkedin','email']}
            />
        </dialog>
    );
}