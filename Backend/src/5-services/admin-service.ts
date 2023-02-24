import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";

async function getOneVacationForAdmin(vacationId:number):Promise<VacationModel> {
    // SQL query
    const sql = `SELECT *,  CONCAT('${appConfig.usersImagesAddress}', imageName) AS imageUrl FROM vacations WHERE vacationId = ?`;

    const vacation = await dal.execute(sql, vacationId);

    if(!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation[0];
}

async function addVacation(vacation:VacationModel):Promise<VacationModel> {

    vacation.validatePost();

    vacation.imageName = await imageHandler.saveImage(vacation.image);

    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    const result:OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;
}

async function updateVacation(vacation:VacationModel):Promise<VacationModel> {

    // Validate:
    vacation.validatePut();

    // Get image name from db:
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);

    // Update existing image:
    if(vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName)
    }
    // SQL QUERY:
    const sql = `UPDATE vacations SET
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE vacationId = ?`;

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    // If vacation not exist:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image property (which is the sent file object) from vacation object:
    delete vacation.image;

    // Return updated vacation:
    return vacation;
}

async function deleteVacation(vacationId:number):Promise<void> {

    // Get image from database:
    const imageName = await getImageNameFromDB(vacationId);

    // Delete image from database:
    imageHandler.deleteImage(imageName);

    // Sql query
    const sql = "DELETE FROM vacations WHERE vacationId = ?";

    // Execute sql query
    const result:OkPacket = await dal.execute(sql, vacationId);

    // If id doesn't exist throw error
    if(result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}


// Get image name from database: 
async function getImageNameFromDB(id: number): Promise<string> {

    // Create sql query:
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;

    // Get object array:
    const vacations = await dal.execute(sql, id);

    // Extract single vacation: 
    const vacation = vacations[0];

    // If no such vacation: 
    if (!vacation) return null;

    // Return image name:
    return vacation.imageName;
}



export default {
    addVacation,
    updateVacation,
    deleteVacation,
    getOneVacationForAdmin
}
