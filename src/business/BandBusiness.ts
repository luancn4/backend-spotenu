import { TokenGenerator } from "../services/tokenGenerator";
import { BandDatabase } from "../data/BandDatabase";
import { UnauthorizedError } from "../errors/UnauthorizedError";

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
}
