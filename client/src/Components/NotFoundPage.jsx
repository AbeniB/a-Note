import { Link } from "react-router-dom";

const NotFoundPage = () =>{
    return(
        <>
            <h1>Error 404: Page Not Found</h1>
            <Link to={'/'}><button>Go Home</button></Link>
        </>
    );
}

export default NotFoundPage;