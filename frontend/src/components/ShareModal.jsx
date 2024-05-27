import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import { 
    FacebookShareButton, 
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    XIcon,
    TwitterShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon,
    EmailShareButton,
    EmailIcon,
    PinterestShareButton,
    PinterestIcon
} from 'react-share'

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
                        <FacebookIcon round className="w-10 h-10"/>
                    </FacebookShareButton>
                    <FacebookMessengerShareButton 
                        url={url}
                        redirectUri={url}
                    >
                        <FacebookMessengerIcon round className="w-10 h-10"/>
                    </FacebookMessengerShareButton>
                    <LinkedinShareButton 
                        url={url}
                    >
                        <LinkedinIcon round className="w-10 h-10"/>
                    </LinkedinShareButton>
                    <TwitterShareButton url={url}>
                        <XIcon round className="w-10 h-10"/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={url}>
                        <WhatsappIcon round className="h-10 w-10"/>
                    </WhatsappShareButton>
                    <RedditShareButton 
                        url={url}
                    >
                        <RedditIcon round className="h-10 w-10"/>
                    </RedditShareButton>
                    <PinterestShareButton url={url}>
                        <PinterestIcon round className="h-10 w-10"/>
                    </PinterestShareButton>
                    <EmailShareButton 
                        url={url}
                        subject="Check this blog out!!"
                    >
                        <EmailIcon round className="h-10 w-10"/>
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