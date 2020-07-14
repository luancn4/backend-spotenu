import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async adminSignup(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await UserController.UserBusiness.adminSignup(
        token,
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async bandSignup(req: Request, res: Response) {
    try {
      await UserController.UserBusiness.bandSignup(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.description,
        req.body.password
      );

      res.status(200).send({
        message: "Band successfully created, wait for aprovation",
      });
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const accessToken = await UserController.UserBusiness.login(
        req.body.emailOrNick,
        req.body.password
      );

      res.status(200).send(accessToken);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
}
