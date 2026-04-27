import { Router } from "express";
import userController from "./user.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";

const userRoute = Router();

userRoute.post("/login", userController.login);
userRoute.get("/me", verifyToken, userController.verifyMe);
userRoute.post("/admin/signup", userController.createAdminProfile);
userRoute.post("/signup", verifyToken, userController.createUser);
userRoute.put("/deactivate", verifyToken, userController.deactivateProfile);
userRoute.put("/update-profile", verifyToken, userController.updateProfile);

export default userRoute;
