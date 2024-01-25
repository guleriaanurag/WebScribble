import { Outlet } from "react-router-dom"
import Menu from "../components/Menu";

export default function BlogsLayout() {

    return (
        <div className="h-[90%]">
            <Menu />
            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
}