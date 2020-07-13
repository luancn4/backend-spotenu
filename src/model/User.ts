import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private type: UserType,
    private description?: string,
    private approved?: Boolean
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

  public getType(): UserType {
    return this.type;
  }

  public getDescription(): string | undefined{
    return this.description 
  }

  public getApproved(): Boolean | undefined{
    return this.approved
  }
}

export const stringToUserType = (input: string): UserType => {
  switch (input) {
    case "normal":
      return UserType.NORMAL;
    case "admin":
      return UserType.ADMIN;
    case "band":
      return UserType.BAND;
    case "premium":
      return UserType.PREMIUM;
    default:
      throw new InvalidParameterError("Invalid user type");
  }
};

export enum UserType {
  NORMAL = "normal",
  ADMIN = "admin",
  BAND = "band",
  PREMIUM = "premium"
}
