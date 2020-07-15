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
}
