import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminService from "../../../Services/AdminService";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";
import AdminVerify from "../../AuthArea/AdminVerify/AdminVerify";
import AuthVerify from "../../AuthArea/AuthVerify/AuthVerify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
    
    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>()
    const navigate = useNavigate();
    const [preview, setPreview] = useState('');
    const minDate = new Date().toISOString().substring(0,10)
    const params = useParams();

    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toISOString().split('T')[0];
      }


    useEffect(()=>{
        AuthVerify();
        if (AdminVerify()) {
        return;
    } else {
        navigate("/list");
    }
    },[])
      
    useEffect(()=>{
        adminService.getOneVacation(+params.vacationId)        
        .then(v => {           
            setValue("vacationId", v.vacationId);
            setValue("destination", v.destination);
            setValue("description", v.description);
            setValue("startDate", formatTime(v.startDate));
            setValue("endDate", formatTime(v.endDate));
            setValue("price", v.price);
            setPreview(v.imageUrl)
        })
        .catch(err => console.log(err.message));
    },[]);


    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminService.updateVacation(vacation)
            notify.success("successfully saved")
            navigate(-1)
        } catch (error:any) {
            console.log(error);
            notify.error(error.message)
        }
    }
    
    function cancel(){
        navigate("/list");
    }

    function showPreview(args:ChangeEvent<HTMLInputElement>):void{
        const preview = URL.createObjectURL(args.target.files[0]);
        setPreview(preview)
    }


    return (
        <div className="EditVacation Box">
			<h2>Add Vacation</h2>
                <form>

                {/* Hiding the id on the form in a Hidden input: */}
                <input type="hidden" {...register("vacationId")} />

                {/* Destination */}
                <label>Destination:</label>
                <TextField
                    inputProps={{ maxLength: 50 }}
                    type="text"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    error={Boolean(formState.errors.destination?.message)}
                    {...register('destination', VacationModel.destinationValidation)}
                    helperText={formState.errors.destination?.message ? formState.errors.destination?.message : ' '} 
                />

                {/* Description */}
                <label>Description:</label>
                <textarea cols={30} rows={10} className="descriptionBox" {...register('description', VacationModel.descriptionValidation)} maxLength={1000}></textarea>
                <span className="ErrForDesc">{formState.errors.description?.message}</span>
                
                {/* starting date: */}
                <br />
                <label> starting date:</label>
                <input type="date" /* min={minDate} */ {...register('startDate', VacationModel.startDateValidation)}/> 
                <span className="Err">{formState.errors.startDate?.message}</span>

                {/* ending date: */}
                <br />
                <label> ending date:</label>
                <input type="date" min={minDate} {...register('endDate', VacationModel.endDateValidation)}/>
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
                    {...register('price', VacationModel.priceValidation)}
                    helperText={formState.errors.price?.message ? formState.errors.price?.message : ' '} 
                />
                {/* Image Input */}
                <label>upload image:</label>
                <br /><br />


                <input type="file" accept="image/*" {...register("image")} onChange={showPreview} />

                {/* image preview */}
                <img src={preview} className="imagePreview"/>

                {/* buttons */}
                <Stack spacing={2} direction="row">

                    {/* reset */}
                    <Button variant="outlined" fullWidth onClick={cancel}>cancel</Button>

                    {/* add vacation */}
                    <Button variant="contained" fullWidth onClick={handleSubmit(send)}>Submit</Button>
                </Stack>
            </form>
        </div>
    );
}

export default EditVacation;

