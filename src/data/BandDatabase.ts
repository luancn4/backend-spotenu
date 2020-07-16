import { BaseDataBase } from "./BaseDatabase";
import { GenericError } from "../errors/GenericError";

export class BandDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";
  protected genreTable: string = "SpotGenre";

  async getAllBands(): Promise<any> {
    try {
      const res = await super.getConnection().raw(`
        SELECT name, email, nickname, approved
        FROM ${this.tableName}
        WHERE type = 'band'
    `);

      return res[0];
    } catch (err) {
      console.error(err);
    }
  }

  async getBandById(id: string): Promise<any> {
    try {
      const res = await super.getConnection().raw(`
        SELECT *
        FROM ${this.tableName}
        WHERE id = '${id}'
    `);

      return res[0][0];
    } catch (err) {
      console.error(err);
    }
  }

  async approveBand(id: string): Promise<any> {
    try {
      await super.getConnection().raw(`
        UPDATE ${this.tableName}
        SET approved = 1
        WHERE id = '${id}'
    `);
    } catch (err) {
      console.error(err);
    }
  }

  async createGenre(genre: string, id: string) {
    try {
      await super
        .getConnection()
        .insert({
          id,
          genre,
        })
        .into(this.genreTable);
    } catch (err) {
      throw new GenericError("Genre already created");
    }
  }

  async getAllGenres() {
    try {
      const genres = await super.getConnection().raw(`
        SELECT id, genre
        FROM ${this.genreTable}
    `);

      return genres[0];
    } catch (err) {
      console.error(err);
    }
  }
}
