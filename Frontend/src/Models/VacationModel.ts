import { RegisterOptions } from "react-hook-form";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description : string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string;
    public image: File;
    public isFollowing:number;
    public followersCount:number;

    public static destinationValidation:RegisterOptions = {
        required: {value:true, message:"Missing destination"},
        minLength: {value:5 , message: "minimum 5 chars"},
        maxLength: {value:50, message: "maximum 50 chars"}
    }

    public static descriptionValidation:RegisterOptions = {
        required: {value:true, message:"Missing description"},
        minLength: {value:10 , message: "minimum 10 chars"},
        maxLength: {value:1000, message: "maximum 1000 chars"}
    }

    public static startDateValidation:RegisterOptions = {
        required: {value:true, message:"Missing starting date"},
    }

    public static endDateValidation:RegisterOptions = {
        required: {value:true, message:"Missing ending date"},
    }

    public static priceValidation: RegisterOptions = {
        required: {value: true, message: "Missing price"},
        min: {value: 0, message: "Price cannot be negative"},
        max: {value: 10000, message: "Price can't exceeds 10,000"},
    };

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image"}
    };

}
export default VacationModel