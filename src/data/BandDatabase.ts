import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class BandDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";

  async getAllBands(): Promise<any> {
    const res = await super.getConnection().raw(`
      SELECT name, email, nickname, approved
      FROM ${this.tableName}
      WHERE type = 'band'
    `);

    return res[0];
  }
}
