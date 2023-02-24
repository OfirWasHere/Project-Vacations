import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class UserService {

    public async userVacations(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let vacations = vacationsStore.getState().vacations;

        //If we don't have vacations: 
        if (vacations.length === 0) {
            // Fetch vacations from backend:
            const response = await axios.get<VacationModel[]>(appConfig.userVacation)
            vacations = response.data;

            // Send all products into redux global state (which will call the reducer):
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
            console.log("fetch");
        }

        return vacations;
    }

    public async followVacation(vacationId: number): Promise<number> {
        const response = await axios.post<number>(appConfig.followVacation + vacationId)
        const FollowVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.FollowVacation, payload: FollowVacation })

        return vacationId;
    }

    public async unFollowVacation(vacationId: number): Promise<number> {
        const response = await axios.post<number>(appConfig.unFollowVacation + vacationId)
        const unFollowVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.UnFollowVacation, payload: unFollowVacation })

        return vacationId;
    }
}

const userService = new UserService();

export default userService;
