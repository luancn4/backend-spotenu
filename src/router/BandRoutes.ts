import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.get("/all", new BandController().getAllBands);
bandRouter.get("/genres", new BandController().getAllGenres);
bandRouter.get("/albums", new BandController().getBandAlbums);
bandRouter.post("/approve", new BandController().approveBand);
bandRouter.post("/genre/create", new BandController().createGenre);
bandRouter.post("/album/create", new BandController().createAlbum);
bandRouter.post("/music/create", new BandController().createMusic);


