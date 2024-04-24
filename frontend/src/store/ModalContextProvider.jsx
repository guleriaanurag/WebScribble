import { createContext, useState } from "react";

export const ModalContext = createContext({
    commentModalState: false,
    toggleCommentModalState: ()=>{},
    shareModalState: false,
    toggleShareModalState: ()=>{},
});

export default function ModalContextProvider({children}){
    
    const[commentModalState,setCommentModalState] = useState(false);

    function toggleCommentModalState(){
        setCommentModalState( prevState => !prevState)
    }

    const[shareModalState,setShareModalState] = useState(false);

    function toggleShareModalState(){
        setShareModalState( prevState => !prevState);
    }

    const ctxValue={
        commentModalState,
        toggleCommentModalState,
        shareModalState,
        toggleShareModalState
    }

    return(
        <ModalContext.Provider value={ctxValue}>
            {children}
        </ModalContext.Provider>
    );
}