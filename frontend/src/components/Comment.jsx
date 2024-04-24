import { formatTimeDifference } from '../assets/helperFunctions';
import logo from '../assets/defaultLogo.jpg';

export default function Comment({comment}){    

    const timeDiff = formatTimeDifference(comment.createdAt);

    return(
        <div className="py-2 px-3 my-5 border border-slate-600 rounded-lg w-[50%] max-md:w-[80%]">
            <div className='flex gap-2 w-full items-center'>
                <div className='rounded-full border w-9 h-9'>
                    <img src={logo} alt="" className='rounded-full'/>
                </div>
                <h4 className="font-bold">{comment.author.name}</h4>
            </div>
            <p className="text-sm">{timeDiff}</p>
            <p className="mt-3">{comment.userComment}</p>
        </div>
    );
}