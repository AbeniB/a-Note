import { useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Archived from "../Extra Components/Archived";
import Bin from "../Extra Components/Bin";

import "../Component Styles/Main.css";

export default function Main({ isSidebarCollapsed }){
    const [buttonManager, setbuttonManager] = useState({
        note: true,
        archive: false,
        bin: false
    });
    const [archivedList, setArchivedList] = useState([]);

    function changeContent(btn){
        const pages = {
            note: false,
            archive: false,
            bin: false
        }
        setbuttonManager({...pages, [btn]: true});
    }

    function handleArchive(note){
        setArchivedList(pv => [...pv, note]);
    }
    return (
        <div className="main">
            <Sidebar changeContent={changeContent} isCollapsed={isSidebarCollapsed}   className="sidebar" />
            {buttonManager.note && <Content handleArchive={handleArchive}/>}
            {buttonManager.archive && <Archived archivedList={archivedList}/>}
            {buttonManager.bin && <Bin/>}
        </div>
    );
}