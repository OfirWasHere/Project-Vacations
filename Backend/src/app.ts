import express from "express";
import expressFileUpload from "express-fileupload"
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authRoutes from "./6-routes/auth-routes"
import sanitize from "./4-models/sanitize";
import userVacationRoutes from "./6-routes/user-vacation-routes"
import adminVacationRoutes from "./6-routes/admin-vacation-routes"

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());

// Sanitize tags
server.use(sanitize);

// Routes
server.use("/api", authRoutes);
server.use("/api", userVacationRoutes);
server.use("/api", adminVacationRoutes);
server.use(routeNotFound);

// catch all
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));
