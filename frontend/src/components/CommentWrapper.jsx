import Comment from "./Comment";

export default function CommentWrapper({comments}){    
    
    return(
        <div className="w-full h-auto px-40 mt-4 py-5 max-lg:px-5">
            {comments.length > 0 && (
                comments.map((comment,idx)=>{
                    return <Comment comment={comment[0]} key={idx}/>
                })
            )}
        </div>
    );
}