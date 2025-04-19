import { useState } from "react";
import MainContext from "../../Contexts/MainContext";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import "./Main.css";

export default function Main(){

    const [currentPage, setCurrentPage] = useState("note");

    function changePage(e){
        const button = e.target.closest('button'); // Get the closest button element
        if (button) {
            const { name } = button; // Access the 'name' property from the button
            setCurrentPage(name); // Update the currentPage state
        }
    }
    
    return (
        <main className="main">
            <MainContext.Provider value={{changePage, currentPage}}>
                <Sidebar />
                <Content />
            </MainContext.Provider>
        </main>
    );
}