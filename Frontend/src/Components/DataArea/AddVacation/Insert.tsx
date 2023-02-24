import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import vacationModel from "../../../Models/VacationModel"
import authService from "../../../Services/AuthService";
import AuthVerify from "../../AuthArea/AuthVerify/AuthVerify";
import "./Insert.css";
import notify from "../../../Utils/Notify";
import adminService from "../../../Services/AdminService";
import imageNotFound from "../../../Assets/Images/images-backgrounds/imgIcon.jpg"

function Insert(): JSX.Element {
    const {register, handleSubmit, formState} = useForm<vacationModel>()
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState<string>('');
    const [preview, setPreview] = useState('');

    // Verifying if user is both logged in and an admin:
    useEffect(()=>{
        AuthVerify();
        if(!authService.isUserAdmin()){
            navigate("/list")
        }
    },[])

    // Image preview:
    useEffect(()=>{
        if(preview === ""){
            setPreview(imageNotFound)
        }
    },[preview])

    function showPreview(args:ChangeEvent<HTMLInputElement>):void{
        const preview = URL.createObjectURL(args.target.files[0]);
        setPreview(preview)
    }

    // Minimum date for vacation:
    function dateHandler(event:ChangeEvent<HTMLInputElement>):void{
        setMinDate(event.target.valueAsDate.toISOString().substring(0,10))
    }

    // handling new vacations
    async function send(vacation: vacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            console.log(vacation);
            
            await adminService.addVacation(vacation)
            notify.success("Added vacation!")
            navigate("/list")
        } catch (error:any) {
            notify.error(error.message)
        }
    }


    return (
        <div className="Insert Box">
            <h2>Add Vacation</h2>
                <form>
                {/* Destination */}
                <TextField
                    inputProps={{ maxLength: 50 }}
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    label="destination"
                    fullWidth
                    error={Boolean(formState.errors.destination?.message)}
                    {...register('destination', vacationModel.destinationValidation)}
                    helperText={formState.errors.destination?.message ? formState.errors.destination?.message : ' '} 
                />

                {/* Description */}
                <label>Description:</label>
                <textarea cols={30} rows={10} className="descriptionBox" {...register('description', vacationModel.descriptionValidation)} maxLength={1000}></textarea>
                <span className="ErrForDesc">{formState.errors.description?.message}</span>
                
                {/* starting date: */}
                <br />
                <label> starting date:</label>
                <input type="date" {...register('startDate', vacationModel.startDateValidation)} onChange={dateHandler} /> 
                <span className="Err">{formState.errors.startDate?.message}</span>

                {/* ending date: */}
                <br />
                <label> ending date:</label>
                <input type="date" min={minDate} {...register('endDate', vacationModel.endDateValidation)}/>
                <span className="Err">{formState.errors.endDate?.message}</span>

                {/* Price */}
                <br />
                <label>price:</label>
                <TextField
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    label=""
                    fullWidth
                    margin="normal"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    error={Boolean(formState.errors.price?.message)}
                    {...register('price', vacationModel.priceValidation)}
                    helperText={formState.errors.price?.message ? formState.errors.price?.message : ' '} 
                />
                <br />
                {/* Image Input */}
                <label>upload image:</label>
                <br /><br />
                <input type="file" accept="image/*" {...register("image", vacationModel.imageValidation)} onChange={showPreview}/>
                <span className="Err">{formState.errors.image?.message}</span>
                {/* image preview design me */}
                <img src={preview} className="imagePreview"/>

                {/* buttons */}
                <Stack spacing={2} direction="row">
                    {/* reset */}
                    <Button variant="outlined" fullWidth type="reset">Reset</Button>
                    {/* add vacation */}
                    <Button variant="contained" fullWidth onClick={handleSubmit(send)}>Submit</Button>
                </Stack>
            </form>
                

                
        </div>
    );
}

export default Insert;

                // {/* Description */}
                // <label>Description:</label>
                // <textarea cols={45} rows={10} className="descriptionBox" {...register('description', vacationModel.descriptionValidation)}></textarea>
                // <span className="ErrForDesc">{formState.errors.description?.message}</span>