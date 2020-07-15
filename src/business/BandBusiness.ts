import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { BandDatabase } from "../data/BandDatabase";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { GenericError } from "../errors/GenericError";

export class BandBusiness {
  constructor(
    private bandDatabase: BandDatabase,
    private tokenGenerator: TokenGenerator
  ) {}

  async getAllBands(token: string): Promise<any> {
    const auth = this.tokenGenerator.verify(token);
    if (auth.type !== "admin") {
      throw new UnauthorizedError("You are not an administrator");
    }

    const bands = await this.bandDatabase.getAllBands();

    return bands;
  }

  async approveBand(token: string, id: string): Promise<any> {
    const auth = this.tokenGenerator.verify(token);

    if (auth.type !== "admin") {
      throw new UnauthorizedError("You are not an administrator");
    }

    const band = await this.bandDatabase.getBandById(id);

    if (band.type !== "band") {
      throw new Error("This user has no type 'band'");
    }
    if (band.approved) {
      throw new Error("Band was already approved");
    }

    await this.bandDatabase.approveBand(id);
  }

  async createGenre(token: string, genre: string): Promise<any> {
    const auth = this.tokenGenerator.verify(token);

    if (auth.type !== "admin") {
      throw new UnauthorizedError("You are not an administrator");
    }

    if (!genre) {
      throw new GenericError("Invalid input");
    }

    const id = new IdGenerator().generate();
    await this.bandDatabase.createGenre(genre.toUpperCase(), id);
  }

  async getAllGenres(token: string): Promise<any> {
    const auth = this.tokenGenerator.verify(token);

    if (auth.type === "admin" || auth.type === "band") {
      const genres = await this.bandDatabase.getAllGenres();
      return { genres };
    } else {
      throw new UnauthorizedError("Insufficient permission");
    }
  }
}
