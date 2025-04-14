import { useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import "./Main.css";

export default function Main({ main_prop }){
    const { isSidebarCollapsed } = main_prop;

    const [currentPage, setCurrentPage] = useState("note");

    function changePage(e){
        const button = e.target.closest('button'); // Get the closest button element
        if (button) {
            const { name } = button; // Access the 'name' property from the button
            setCurrentPage(name); // Update the currentPage state
        }
    }

    const sideBar_prop = {
        changePage: changePage,
        isSidebarCollapsed: isSidebarCollapsed
    }

    const content_prop = {
        currentPage: currentPage
    }
    
    return (
        <main className="main">
            <Sidebar sideBar_prop={sideBar_prop} />
            <Content content_prop={content_prop}/>
        </main>
    );
}