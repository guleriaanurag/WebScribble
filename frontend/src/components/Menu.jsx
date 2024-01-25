import { useState } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { Link, NavLink } from "react-router-dom";

export default function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    const classes = 'px-5 py-2 ';
    return (
        <aside className={`h-full bg-slate-800 max-md:w-auto relative z-[50] transition-all ease-in-out duration-[500ms] ${!isMenuOpen ? 'w-0' : 'w-[200px]'}`}>
            <button className='focus:outline-none relative left-full top-1/2' onClick={toggleMenu}>
                {isMenuOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            <ul className='overflow-hidden flex flex-col justify-between text-stone-100'>
                <Link to='post'><button className='bg-sky-500 text-stone-100 px-4 py-2 mx-5 rounded-lg'>Create Blog</button></Link>
                <NavLink to='' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes} end>All</NavLink>
                <NavLink to='Science' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Science</NavLink>
                <NavLink to='Music' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Music</NavLink>
                <NavLink to='Games' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Games</NavLink>
                <NavLink to='Fiction' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Fiction</NavLink>
                <NavLink to='Technology' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Technology</NavLink>
                <NavLink to='Programming' className={({ isActive }) => isActive ? classes + 'text-sky-500' : classes}>Programming</NavLink>
            </ul>
        </aside>
    );
}