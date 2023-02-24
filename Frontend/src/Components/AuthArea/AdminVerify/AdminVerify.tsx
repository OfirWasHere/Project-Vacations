import RoleModel from "../../../Models/RoleModel";
import { authStore } from "../../../Redux/AuthState";

function AdminVerify():boolean{
    const fullTokenObj = authStore.getState()
    if(fullTokenObj){
        try {
            if(fullTokenObj.user.role === RoleModel.Admin){
                return true;
            }
            return false;
        } catch (error:any) {
            console.log(error.message);            
        }
    }
}

export default AdminVerify;
