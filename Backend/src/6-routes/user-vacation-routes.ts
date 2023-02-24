import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import userService from "../5-services/user-service";

const router = express.Router();

// Get all vacations as user:
// GET http://localhost:4000/api/users/vacations
router.get("/users/vacations", verifyLoggedIn ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacations = await userService.getAllVacationsForUser(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Follow vacations as user:
// POST http://localhost:4000/api/users/follow/:vacationId

router.post("/users/follow/:vacationId([0-9]+)", verifyLoggedIn ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId;
        await userService.follow(user.userId, vacationId);
        response.status(201);
    }
    catch (err: any) {
        next(err);
    }
});

// Un-follow vacation as user:
// POST http://localhost:4000/api/users/unfollow/:vacationId

router.post("/users/unfollow/:vacationId([0-9]+)", verifyLoggedIn ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await userService.unfollow(user.userId, vacationId);
        response.status(204);
    }
    catch (err: any) {
        next(err);
    }
});

// Get images from db
// GET http://localhost:4000/api/users/vacations/images/:imageName
router.get("/users/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
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
