import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - application level state:
export class VacationState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
    FetchVacations = "FetchVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnFollowVacation = "UnFollowVacation",
}

// 3. Action - a single object describing single operation on the data:

export interface VacationsAction {
    type: VacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}


// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function vacationsReducer(currentState = new VacationState(), action: VacationsAction): VacationState {

    const newState: VacationState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here the payload is the product list fetch by the server
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here the payload is the added product
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here the payload is the updated product
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here the payload is id to delete
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        case VacationsActionType.FollowVacation:
            console.log("I FOLLOW NOW");
            
            const isNotFollowing = newState.vacations.find(v => v.vacationId === action.payload.vacationId);
            isNotFollowing.isFollowing = 1;
            isNotFollowing.followersCount += 1;
            break;

        case VacationsActionType.UnFollowVacation:
            console.log("I NO FOLLOW NOW");
            const isFollowVacation = newState.vacations.find(v => v.vacationId === action.payload.vacationId);
            if (isFollowVacation.isFollowing === 1) {
                isNotFollowing.isFollowing = 0;
                isNotFollowing.followersCount -= 1;
            }
            break;
    }

    return newState;

}

// 5. Store - Redux manager:
export const vacationsStore = createStore(vacationsReducer);