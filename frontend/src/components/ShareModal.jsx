import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from 'react-router-dom';

import {
    FaFacebook,
    FaLinkedin,
    FaPinterest,
    FaReddit,
    FaWhatsapp
} from 'react-icons/fa';

import { FaSquareXTwitter } from 'react-icons/fa6';

import { MdEmail } from 'react-icons/md';

import { ModalContext } from "../store/ModalContextProvider";
import { AuthenticationContext } from "../store/AuthenticationContext";


export default function ShareModal(){
    
    const shareModal = useRef(null);
    const navigate = useNavigate();

    const { blogId } = useParams();

    const { shareModalState, toggleShareModalState } = useContext(ModalContext);
    const { isAuthenticated } = useContext(AuthenticationContext);
    
    const [isTextCopied,setIsTextCopied] = useState(false);

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

    function handleLinkCopy(){
        setIsTextCopied(true);
        window.navigator.clipboard.writeText(url);
    }

    function openPopup(shareUrl){
        const width = 600;
        const height = 400;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        window.open(
            shareUrl, 
            'ShareWindow', 
            `width=${width},height=${height},top=${top},left=${left},noopener,noreferrer`
        );
    };

    const url = window.location.origin+`/blogs/blog/${blogId}`;
    const title = "Check this blog out!";
    const summary = "I found this blog very interesting and thought you might like it too.";
    const emailBody = `${summary} Read more at: ${url}`;

    return (
        <dialog ref={shareModal} className="w-[40vw] h-[40vh] rounded-2xl max-lg:h-[43vh] max-lg:w-[80vw]" onKeyDown={(e)=>handleKeyDown(e)}>
            <button className="absolute top-4 right-4 p-2 outline-none text-2xl z-50" onClick={handleModalClose}>x</button>
            <div className="h-full w-full flex flex-col p-3 justify-evenly">
                <div className="icon-box flex flex-wrap gap-2">
                    <FaFacebook 
                        className="w-10 h-10 text-blue-600 cursor-pointer"
                        onClick={() => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}
                    />
                    <FaLinkedin 
                        className="h-10 w-10 text-blue-600 cursor-pointer"
                        onClick={() => openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`)}
                    />
                    <FaSquareXTwitter 
                        className="h-10 w-10 cursor-pointer"
                        onClick={() => openPopup(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)}
                    />
                    <FaWhatsapp 
                        className="h-10 w-10 bg-emerald-500 text-white cursor-pointer"
                        onClick={() => openPopup(`https://web.whatsapp.com/send?text=${encodeURIComponent(title+" "+url)}`)}
                    />
                    <FaReddit 
                        className="h-10 w-10 text-orange-500 cursor-pointer"
                        onClick={() => openPopup(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title + " " + url)}`)}
                    />
                    <FaPinterest 
                        className="h-10 w-10 text-red-600 cursor-pointer"
                        onClick={() => openPopup(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(summary)}`)}
                    />
                    <MdEmail
                        className="w-10 h-10 text-gray-600 cursor-pointer"
                        onClick={() => openPopup(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`)}
                    />
                </div>
                <div className="copy-container flex items-center justify-evenly text-stone-50 bg-stone-900 p-2 rounded-lg">
                    <div className="h-auto w-[80%] overflow-scroll hide-scroll items-center p-0">
                        <p>{url}</p>
                    </div>
                    <p 
                        className="ml-2 text-sky-500 cursor-pointer"
                        onClick={handleLinkCopy}
                    >
                        {isTextCopied ? 'Copied' : 'Copy'}
                    </p>
                </div>
            </div>
        </dialog>
    );
}