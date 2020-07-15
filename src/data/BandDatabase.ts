import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class BandDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";
  protected genreTable: string = "Genre";

  async getAllBands(): Promise<any> {
    const res = await super.getConnection().raw(`
      SELECT name, email, nickname, approved
      FROM ${this.tableName}
      WHERE type = 'band'
    `);

    return res[0];
  }

  async getBandById(id: string): Promise<any> {
    const res = await super.getConnection().raw(`
      SELECT *
      FROM ${this.tableName}
      WHERE id = '${id}'
    `);

    return res[0][0];
  }

  async approveBand(id: string): Promise<any> {
    await super.getConnection().raw(`
    UPDATE ${this.tableName}
    SET approved = 1
    WHERE id = '${id}'
    `);
  }

  async createGenre(genre: string, id: string) {
    await super
      .getConnection()
      .insert({
        id,
        genre,
      })
      .into(this.genreTable);
  }

  async getAllGenres() {
    const genres = await super.getConnection().raw(`
      SELECT id, genre
      FROM ${this.genreTable}
    `)

    return genres[0]
  }
}
