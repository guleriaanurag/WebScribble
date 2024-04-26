// package imports
import { Link } from "react-router-dom";

// project file imports
import img from '../assets/writing.gif';

export default function Introduction() {
    return (
        <div className="hide-scroll h-full px-32 pb-6 text-lg bg-slate-800 flex flex-col text-stone-100 text-center max-lg:h-auto max-lg:px-4">
            <h1 className="heading text-4xl font-bold mb-4">Welcome to Web Scribbles</h1>
            <p className="leading-7">
                Dive into a world of creativity and knowledge at Web Scribbles. Our platform is a hub for insightful blogs, engaging stories, and diverse perspectives. Whether you're an aspiring writer or a curious reader, you're invited to be a part of this vibrant community.
            </p>
            <img src={img} className="w-[40%] h-[50%] m-auto mt-5 max-md:w-[60%] max-md:h-[60%] rounded-3xl" alt="Writing......" />
            <p className="leading-7 mt-4">
                At Web Scribbles, we believe in the power of words to inspire, inform, and connect. Discover thought-provoking articles, captivating narratives, and a wealth of information crafted by our talented community of contributors.
            </p>
            <p className="leading-7 mt-4">
                Ready to embark on a journey of exploration? Click the link below to start reading the latest blogs and immerse yourself in a world where every scribble tells a unique story.
            </p>
            <p className="mt-6">
            <Link to='blogs' className="text-sky-600 text-2xl underline hover:text-sky-300 p-2">Explore Blogs</Link> OR
            <Link to='blogs/post' className="text-sky-600 p-2 text-2xl underline hover:text-sky-300">Create a Blog</Link>
            </p>
        </div>
    );
}