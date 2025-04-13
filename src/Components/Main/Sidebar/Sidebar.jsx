import '../Component Styles/Sidebar.css';

export default function Sidebar({ changeContent, isCollapsed }){
    return(
        <div  className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button onClick={() => changeContent('note')}>{isCollapsed ? 'N' : 'Notes'}</button>
            <button onClick={() => changeContent('archive')}>{isCollapsed ? 'A' : 'Archived'}</button>
            <button onClick={() => changeContent('bin')}>{isCollapsed ? 'B' : 'Bin'}</button>
        </div>
    );
}