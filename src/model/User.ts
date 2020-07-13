import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private type: UserType
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNickname(): string {
    return this.nickname
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): UserType {
    return this.type;
  }
}

export const stringToUserType = (input: string): UserType => {
  switch (input) {
    case "NORMAL":
      return UserType.NORMAL;
    case "ADMIN":
      return UserType.ADMIN;
    case "BAND":
      return UserType.BAND;
    case "PREMIUM":
      return UserType.PREMIUM;
    default:
      throw new InvalidParameterError("Invalid user type");
  }
};

export enum UserType {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
  BAND = "BAND",
  PREMIUM = "PREMIUM"
}
