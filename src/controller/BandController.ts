import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { TokenGenerator } from "../services/tokenGenerator";

export class BandController {
  private static BandBusiness = new BandBusiness(
    new BandDatabase(),
    new TokenGenerator()
  );

  async getAllBands(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await BandController.BandBusiness.getAllBands(token);

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async approveBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      await BandController.BandBusiness.approveBand(token, req.body.id);

      res.status(200).send({
        message: "Band approved",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async createGenre(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      await BandController.BandBusiness.createGenre(token, req.body.genre);

      res.status(200).send({
        message: "Genre successfully created",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async getAllGenres(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const genres = await BandController.BandBusiness.getAllGenres(token);

      res.status(200).send(genres);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async createAlbum(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      await BandController.BandBusiness.createAlbum(
        token,
        req.body.name,
        req.body.genres
      );

      res.status(200).send({
        message: "Album successfully created",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async createMusic(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      await BandController.BandBusiness.createMusic(
        token,
        req.body.name,
        req.body.album
      );

      res.status(200).send({
        message: "Music successfully created",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async getBandAlbums(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const albums = await BandController.BandBusiness.getBandAlbums(token);

      res.status(200).send(albums);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
