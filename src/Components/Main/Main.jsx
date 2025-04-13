import { useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import "./Main.css";

export default function Main({ main_prop }){
    const { isSidebarCollapsed } = main_prop;

    const [currentPage, setCurrentPage] = useState("note");

    function changePage(e){
        const {name} = e.target;

        if(name === "note" || "archive" || "trash"){
            setCurrentPage(name);
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