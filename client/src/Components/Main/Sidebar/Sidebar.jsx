import './Sidebar.css';
import { useContext } from 'react';
import AppContext from "../../../Contexts/AppContext";
import MainContext from "../../../Contexts/MainContext";


export default function Sidebar(){

    const { isSidebarCollapsed} = useContext(AppContext);
    const {changePage} = useContext(MainContext);

    return(
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapse' : ''}`} onClick={(e) => changePage(e)}>
            <button className='button' name='note'><img width={16} height={16} src='/assets/notesIcon.png'/>{!isSidebarCollapsed && <span>Note</span>}</button>
            <button className='button' name='archive'><img width={16} height={16} src='/assets/archiveIcon.png'/>{!isSidebarCollapsed && <span>Archive</span>}</button>
            <button className='button' name='trash'><img width={16} height={16} src='/assets/trashIcon.png'/>{!isSidebarCollapsed && <span>Trash</span>}</button>
        </aside>
    );
}