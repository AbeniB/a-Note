import Sidebar from "./Sidebar";
import Content from "./Content";
import "../Component Styles/Main.css";

export default function Main(){
    return (
        <div className="main">
            <Sidebar  className="sidebar" />
            <Content  className="content"/>
        </div>
    );
}