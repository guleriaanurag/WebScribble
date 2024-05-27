import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import { 
    FacebookShareButton, 
    FacebookMessengerShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    PinterestShareButton,
} from 'react-share';

import {
    FaFacebook,
    FaFacebookMessenger,
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

    const url = window.location.origin+`/blogs/blog/${blogId}`;

    return (
        <dialog ref={shareModal} className="w-[40vw] h-[40vh] rounded-2xl max-lg:h-[43vh] max-lg:w-[80vw]" onKeyDown={(e)=>handleKeyDown(e)}>
            <button className="absolute top-4 right-4 p-2 outline-none text-2xl z-50" onClick={handleModalClose}>x</button>
            <div className="h-full w-full flex flex-col p-3 justify-evenly">
                <div className="icon-box flex flex-wrap gap-2">
                    <FacebookShareButton url={url}>
                        <FaFacebook className="w-10 h-10 text-blue-600"/>
                    </FacebookShareButton>
                    <FacebookMessengerShareButton 
                        url={url}
                        redirectUri={url}
                    >
                        <FaFacebookMessenger className="w-10 h-10 text-blue-600"/>
                    </FacebookMessengerShareButton>
                    <LinkedinShareButton 
                        url={url}
                    >
                        <FaLinkedin className="h-10 w-10 text-blue-600"/>
                    </LinkedinShareButton>
                    <TwitterShareButton url={url}>
                        <FaSquareXTwitter className="h-10 w-10"/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={url}>
                        <FaWhatsapp className="h-10 w-10 bg-emerald-500 text-white"/>
                    </WhatsappShareButton>
                    <RedditShareButton 
                        url={url}
                    >
                        <FaReddit className="h-10 w-10 text-orange-500"/>
                    </RedditShareButton>
                    <PinterestShareButton url={url}>
                        <FaPinterest className="h-10 w-10 text-red-600"/>
                    </PinterestShareButton>
                    <EmailShareButton 
                        url={url}
                        subject="Check this blog out!!"
                    >
                        <MdEmail className="w-10 h-10 text-gray-600"/>
                    </EmailShareButton>
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