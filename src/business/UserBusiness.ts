import { UserDatabase } from "../data/UserDatabase";
import { User, UserType } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) {}

  async signup(
    name: string,
    nickname: string,
    email: string,
    password: string
  ) {
    if (!name || !nickname || !email || !password) {
      return new InvalidParameterError("Missing inputs");
    }

    if (email.indexOf("@") === -1) {
      throw new Error("Invalid email");
    }

    if (password.length < 6) {
      throw new Error("Password must have at least 6 characters");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);
    const type = UserType.NORMAL;

    await this.userDatabase.signup(
      new User(id, name, nickname, email, cryptedPassword, type)
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      type,
    });

    return { accessToken };
  }
}
