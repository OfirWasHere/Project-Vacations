import { Button, TextField } from "@mui/material";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import "./Login.css";
import emailValidator from "email-validator"

function Login(): JSX.Element {
    
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
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
    

    
    async function send(CredentialsModel:CredentialsModel){
        try {
            // checking if email is valid
            if(!emailValidator.validate(CredentialsModel.email)) throw new Error("Email is invalid")
            // if user has inserted valid login info then will be logged in
            await authService.login(CredentialsModel)
            notify.success("Welcome!")
            navigate("/list")

        } catch (error:any) {
            notify.error("Incorrect email or password")
        }

    }


    return (
        <div className="Login Box">
			<h2>login</h2>
            <form>

                {/* Email */}
               <TextField className="CustomTextField"
                autoComplete="email"
                type="text"
                id="filled-basic"
                variant="filled"
                label="Email Address"
                fullWidth
                error={Boolean(formState.errors.email?.message)}
                {...register("email", CredentialsModel.emailValidation)}
                helperText={formState.errors.email?.message ? formState.errors.email?.message : ' '} 
                />

                {/* Password */}
                <TextField className="CustomTextField"
                autoComplete="current-password"
                type="text"
                id="filled-basic"
                variant="filled"
                label="Password"
                fullWidth
                error={Boolean(formState.errors.password?.message)}
                {...register("password", CredentialsModel.passwordValidation)}
                helperText={formState.errors.password?.message ? formState.errors.password?.message : ' '}
                />

            <Button
            onClick={handleSubmit(send)}
            variant="contained"
            >
            &nbsp; login
          </Button>
            <p>not a member? <NavLink className={"registerLink"} to={"/register"}> click me</NavLink>
            or <NavLink className={"registerLink"} to={"/home"}>go back</NavLink></p>
        </form>
    </div>
    );
}

export default Login;

