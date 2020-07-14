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
      return new UnauthorizedError("You are not an administrator");
    }

    const bands = await this.bandDatabase.getAllBands();

    return bands;
  }
}
