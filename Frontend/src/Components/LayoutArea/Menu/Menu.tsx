import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(()=>{
        // Getting the sate of a user and saving it
        setUser(authStore.getState().user);
        // Updating user State on live
        authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        })
    }, []);


    return (
        <div className="Menu" style={{marginTop: user ? '0px' : '-70px', transition:"1s"}}>

            {/* Check if user is logged in */}
            {user && <>
                {authService.isUserAdmin() ?
                // display only to admin 
                <>
                <div className="linksDesign">

                <NavLink to="/home" className="removeLinkHref"><Button variant="contained">Home</Button></NavLink>
                <NavLink to="/list" className="removeLinkHref"><Button variant="contained">List</Button></NavLink>
                <NavLink to="/add" className="removeLinkHref"><Button variant="contained">Add</Button></NavLink>
                <NavLink to="/chart" className="removeLinkHref"><Button variant="contained">chart</Button></NavLink>
                </div>
                </>
                :
                // display to users only
                <>
                <div className="linksDesign">
                    <NavLink to="/list">List</NavLink>
                    <span> | </span>
                </div>
                </>}
            </>}
            

        </div>
    );
}

export default Menu;