import { Outlet } from "react-router-dom"
import Menu from "../components/Menu";

export default function BlogsLayout() {

    return (
        <div className="hide-scroll overflow-scroll h-full">
            <Menu />
            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
}