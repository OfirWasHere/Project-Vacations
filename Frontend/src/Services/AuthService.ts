import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import RoleModel from "../Models/RoleModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    // Register:
    public async register(user: UserModel): Promise<void> {

        // Send user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get the returned token:
        const token = response.data;

        console.log(token);

        // Send token to global state:
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get the returned token:
        const token = response.data;

        // Send token to global state:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout:
    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    // Is user logged in:
    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

    public isUserAdmin():boolean{
        if(authStore.getState().user.role === RoleModel.Admin){
            return true
        }
        return false;
    }

}

const authService = new AuthService();

export default authService;


