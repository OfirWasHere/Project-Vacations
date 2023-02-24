import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class AdminService {

    public async getOneVacation(vacationID:number):Promise<VacationModel>{
        const response = await axios.get<VacationModel>(appConfig.adminGetOneVacation + vacationID)
        const vacation = response.data
        return vacation
    }

    // add new vacation (admin only)
    public async addVacation(vacation:VacationModel):Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.addVacation, vacation, { headers })
        const addedVacations = response.data
        
        // Send added vacation into redux global state (which will call the reducer):
        vacationsStore.dispatch({type: VacationsActionType.AddVacation, payload: addedVacations})
    }

    // update vacation (admin only)
    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type" : "multipart/form-data" }; // Tell axios that we're sending text and file to backend:
        const response = await axios.put<VacationModel>(appConfig.updateVacation + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data

        // Send updated vacation into redux global state (which will call the reducer):
        vacationsStore.dispatch({type: VacationsActionType.UpdateVacation, payload:updatedVacation})
    }

    // Delete vacation (admin only)
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.deleteVacation + vacationId);

        // Send delete id into redux global state (which will call the reducer):
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacation, payload:vacationId})
    }
}

const adminService = new AdminService();

export default adminService;
