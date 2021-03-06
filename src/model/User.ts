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
    return this.nickname;
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

  public getDescription(): string | undefined {
    return this.description;
  }

  public getApproved(): Boolean | undefined {
    return this.approved;
  }
}

export enum UserType {
  NORMAL = "normal",
  ADMIN = "admin",
  BAND = "band",
  PREMIUM = "premium",
}
