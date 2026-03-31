import { Router } from "express";
import userController from "./user.controller.js";

const userRoute = Router();

userRoute.post("/signup", userController.createUser);
userRoute.post("/login", userController.login);
userRoute.put("/deactivate", userController.deactivateProfile);
userRoute.put("/update-profile", userController.updateProfile);

export default userRoute;
