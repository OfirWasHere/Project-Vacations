import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description : string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;

    public constructor (vacation:VacationModel){
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        destination: Joi.string().required().min(5).max(50),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().positive().required().max(10000),
        imageName: Joi.string().forbidden(),
        image: Joi.object().required()
    })

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().positive().integer(),
        destination: Joi.string().required().min(5).max(50),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().positive().required().max(10000),
        imageName: Joi.string().optional().min(38).max(50),
        image: Joi.object().optional()
    })

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}
export default VacationModel