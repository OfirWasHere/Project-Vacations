import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>();

    useEffect(()=>{
        setUser(authStore.getState().user);

        authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        })
    }, []);
    
    function logout():void {
        authService.logout();
    }

    return (
        <div className="AuthMenu">
            {user && <>
            
            <span>Hello {user.firstName} {user.lastName} | </span>

            <NavLink className="logoutBtn" to="/home" onClick={logout}>logout</NavLink>

            </>}

        </div>
    );
}

export default AuthMenu;
