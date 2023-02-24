import "./PageNotFound.css";
import lostImage from "../../../Assets/Images/images-backgrounds/duolingo.jpg"
import { useEffect } from "react";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

function PageNotFound(): JSX.Element {
    
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home")
        },5000)
    },[])



    return (
        <div className="PageNotFound">
            <p>
                looks like you got lost
                please wait a moment while we direct you to homepage
            </p>
            <Spinner/> 
            <img src={lostImage}/>
        </div>
    );
}

export default PageNotFound;
