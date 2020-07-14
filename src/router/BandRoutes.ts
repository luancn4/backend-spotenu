import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.get("/all", new BandController().getAllBands);
bandRouter.post("/approve", new BandController().approveBand);
bandRouter.post("/genre/create", new BandController().createGenre);


