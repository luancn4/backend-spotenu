import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.get("/all", new BandController().getAllBands);
bandRouter.post("/approve", new BandController().approveBand);
bandRouter.get("/genres", new BandController().getAllGenres);
bandRouter.post("/genre/create", new BandController().createGenre);
bandRouter.post("/album/create", new BandController().createAlbum);
bandRouter.post("/music/create", new BandController().createMusic);


