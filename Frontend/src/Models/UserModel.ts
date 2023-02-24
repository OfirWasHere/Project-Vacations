import { RegisterOptions } from "react-hook-form";
import RoleModel from "./RoleModel";

class UserModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: RoleModel;
    public password: string;

    
    public static firstNameValidation: RegisterOptions = {
        required: {value:true, message:"Missing first name"},
        minLength: {value:2 , message: "minimum 2 chars"},
        maxLength: {value:20, message: "maximum 20 chars"}
    }

    public static lastNameValidation: RegisterOptions = {
        required: {value:true, message:"Missing last name"},
        minLength: {value:2, message: "minimum 2 chars"},
        maxLength: {value:20, message: "maximum 20 chars"}
    }

    public static emailValidation: RegisterOptions = {
        required: {value: true, message: "Missing email"},
        minLength: {value: 10, message: "Email must be minimum 10 chars"},
        maxLength: {value: 50, message: "Email can't exceeds 50 chars"},
    };

    public static passwordValidation: RegisterOptions = {
        required: {value:true, message:"Missing password"},
        minLength: {value:4, message: "minimum 4 chars"},
        maxLength: {value:50, message: "maximum 50 chars"}
    }
}

export default UserModel;
