import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: RoleModel;
    public password: string;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(10).max(50),
        role: Joi.string().required().min(2).max(10),
        password: Joi.string().required().min(4).max(50)
    })

    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default UserModel;
