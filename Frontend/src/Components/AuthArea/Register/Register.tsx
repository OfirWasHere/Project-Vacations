import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import RoleModel from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Register.css";
import emailValidator from "email-validator"
import { useEffect } from "react";

function Register(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<UserModel>()
    const navigate = useNavigate();

    // Checking if the user is logged on, if yes then move them instatly into the vacations page
    useEffect(()=>{
        isUserLoggedIn()
    }, []);

    function isUserLoggedIn() {
        if(authService.isLoggedIn() === true){
            navigate("/list")
        }
    }

    // Sending the user data to the register service
    async function send(userModel: UserModel) {
        try {
            // Adding user role to new registered users
            userModel.role = RoleModel.User;

            // checking if email is valid
            if(!emailValidator.validate(userModel.email)) throw new Error("Email is invalid")

            // if all is good then a new user is created
            await authService.register(userModel)
            notify.success("Welcome!")
            navigate("/list")

        } catch (error:any) {
            notify.error(error)
        }
    }


    return (
        <div className="Register Box">
			<h2>Register</h2>
            <form>
            <Stack direction="row" spacing={2}>

                {/* First Name */}
                <TextField
                autoComplete="first-Name"
                type="text"
                id="filled-basic"
                variant="filled"
                label="First name"
                fullWidth
                error={Boolean(formState.errors.firstName?.message)}
                {...register("firstName", UserModel.firstNameValidation)}
                helperText={formState.errors.firstName?.message ? formState.errors.firstName?.message : ' '} 
                />

                {/* Last Name */}
                <TextField
                autoComplete="family-name"
                type="text"
                id="filled-basic"
                variant="filled"
                label="Last name"
                fullWidth
                error={Boolean(formState.errors.lastName?.message)}
                {...register("lastName", UserModel.lastNameValidation)}
                helperText={formState.errors.lastName?.message ? formState.errors.lastName?.message : ' '} 
                />
                </Stack>

                {/* Email */}
                <TextField
                autoComplete="email"
                type="text"
                id="filled-basic"
                variant="filled"
                label="Email Address"
                fullWidth
                error={Boolean(formState.errors.email?.message)}
                {...register("email", UserModel.emailValidation)}
                helperText={formState.errors.email?.message ? formState.errors.email?.message : ' '} 
                />

                {/* Password */}
                <TextField
                autoComplete="current-password"
                type="text"
                id="filled-basic"
                variant="filled"
                label="Password"
                fullWidth
                error={Boolean(formState.errors.password?.message)}
                {...register("password", UserModel.passwordValidation)}
                helperText={formState.errors.password?.message ? formState.errors.password?.message : ' '} 
                />

            <Button
            onClick={handleSubmit(send)}
            variant="contained"
            >
            &nbsp; Register
            </Button>

            <p>already a member? <NavLink className={"loginLink"} to={"/login"}> click me</NavLink>
            or <NavLink className={"loginLink"} to={"/home"}>go back</NavLink></p>
            </form>
        </div>
    );
}

export default Register;
