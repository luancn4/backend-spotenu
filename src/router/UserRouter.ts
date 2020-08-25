import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);
userRouter.post("/signup/admin", new UserController().adminSignup);
userRouter.post("/signup/band", new UserController().bandSignup);
userRouter.post("/login", new UserController().login);
userRouter.get("/info", new UserController().getInfoById);
userRouter.get("/search", new UserController().getMusicByName);
