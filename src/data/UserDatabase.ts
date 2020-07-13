import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";

  async signup(user: User) {
    await super
      .getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        nickname: user.getNickname(),
        email: user.getEmail(),
        password: user.getPassword(),
        type: user.getType()
      })
      .into(this.tableName);
  }
}
