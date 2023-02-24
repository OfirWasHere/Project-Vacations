import express, { Request, Response, NextFunction } from "express";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import adminService from "../5-services/admin-service";

const router = express.Router();

// Get one Vacation as admin:
// GET http://localhost:4000/api/admin/vacation/:vacationId
router.get("/admin/vacation/:vacationId", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await adminService.getOneVacationForAdmin(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});


// add new vacation:
// GET http://localhost:4000/api/admin/vacations
router.post("/admin/vacations", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await adminService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Update vacation: 
//http://localhost:4000/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await adminService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// Delete Vacation: http://localhost:4000/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await adminService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// Get images from db
// GET http://localhost:4000/api/admin/vacations/images/:imageName
router.get("/admin/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
