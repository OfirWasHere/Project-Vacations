import jwtDecode from "jwt-decode";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";

function AuthVerify(): JSX.Element {
    // Getting full token about user
    const fullTokenObj = authStore.getState()

    try {
        // taking the full token and checking expiration date
        if(fullTokenObj){
            
            const token:any = jwtDecode(fullTokenObj.token)
            const tokenExpTime = token.exp

            if(tokenExpTime * 1000 < Date.now() + (3 * 60 * 60)){
                console.log("token is expired!");
                logout()
            }
        }

    } catch (error:any) {
        console.log(error.message)
    }

    // forcefully logging the user out if token is invalid (expired, or doesn't exists):
    function logout():void {
        authService.logout();
    }


    return;
}

export default AuthVerify;
