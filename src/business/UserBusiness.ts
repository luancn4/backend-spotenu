import { UserDatabase } from "../data/UserDatabase";
import { User, UserType } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { GenericError } from "../errors/GenericError";
import { InvalidEmailError } from "../errors/InvalidEmailError";

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
  ): Promise<any> {
    if (!name || !nickname || !email || !password) {
      return new InvalidParameterError("Missing inputs");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidEmailError("Invalid email");
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

  async adminSignup(
    token: string,
    name: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<any> {
    const auth = this.tokenGenerator.verify(token);
    if (auth.type !== "admin") {
      return new UnauthorizedError("You are not an administrator");
    }

    if (!name || !nickname || !email || !password) {
      return new InvalidParameterError("Missing inputs");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidEmailError("Invalid email");
    }

    if (password.length < 10) {
      throw new GenericError("Password must have at least 10 characters");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);
    const type = UserType.ADMIN;

    await this.userDatabase.signup(
      new User(id, name, nickname, email, cryptedPassword, type)
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      type,
    });

    return { accessToken };
  }

  async bandSignup(
    name: string,
    nickname: string,
    email: string,
    description: string,
    password: string
  ) {
    if (!name || !nickname || !email || !password || !description) {
      return new InvalidParameterError("Missing inputs");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidEmailError("Invalid email");
    }

    if (password.length < 6) {
      throw new GenericError("Password must have at least 10 characters");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);
    const type = UserType.BAND;

    await this.userDatabase.signup(
      new User(id, name, nickname, email, cryptedPassword, type, description)
    );
  }

  async login(emailOrNickname: string, password: string) {
    if (!emailOrNickname || !password) {
      throw new InvalidParameterError("Missing inputs");
    }

    const user = await this.userDatabase.login(emailOrNickname);

    if (!user) {
      throw new GenericError("Wrong email or password");
    }

    const decryptedPassword = await this.hashGenerator.compareHash(
      password,
      user.password
    );

    if (!decryptedPassword) {
      throw new GenericError("Wrong email or password");
    }

    const accessToken = this.tokenGenerator.generate({
      id: user.id,
      type: user.type,
    });

    return { accessToken };
  }
}
