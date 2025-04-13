import './Sidebar.css';

export default function Sidebar({ sideBar_prop }){
    const {changePage, isSidebarCollapsed} = sideBar_prop;

    return(
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapse' : ''}`} onClick={(e) => changePage(e)}>
            <button name='note'>{isSidebarCollapsed ? 'N' : 'Note'}</button>
            <button name='archive'>{isSidebarCollapsed ? 'A' : 'Archive'}</button>
            <button name='trash'>{isSidebarCollapsed ? 'T' : 'Trash'}</button>
        </aside>
    );
}