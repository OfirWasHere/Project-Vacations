import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService"
import AuthVerify from "../../AuthArea/AuthVerify/AuthVerify";
import "./Home.css";

function Home(): JSX.Element {
    // remove me?

    useEffect(()=>{
        isUserLoggedIn()
        AuthVerify()
    }, []);

    function isUserLoggedIn() {
        if(authService.isLoggedIn() === false){
            authService.logout();
        }
    }

    return (
        <div className="Home">
            <h4>We are a team of professional travel experts</h4>
            <h2>Trust <span> Our Experience</span></h2>

            <div className="links">
                <NavLink className="btn" to="/register"> register</NavLink>
                <NavLink className="btn" to="/login"> login</NavLink>
            </div>
        </div>
    );
}

export default Home;
