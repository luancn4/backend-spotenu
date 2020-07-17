import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";

  async signup(user: User) {
    try {
      await super
        .getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          nickname: user.getNickname(),
          email: user.getEmail(),
          password: user.getPassword(),
          type: user.getType(),
          description: user.getDescription(),
        })
        .into(this.tableName);
    } catch (err) {
      console.error(err);
    }
  }

  async login(emailOrNick: string) {
    try {
      const user = await super.getConnection().raw(`
        SELECT *
        FROM ${this.tableName}
        WHERE email = '${emailOrNick}'
        OR
        nickname = '${emailOrNick}'
    `);
      return user[0][0];
    } catch (err) {
      console.error(err);
    }
  }
}
