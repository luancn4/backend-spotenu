import { BaseDataBase } from "./BaseDatabase";
import { GenericError } from "../errors/GenericError";

export class BandDatabase extends BaseDataBase {
  protected tableName: string = "SpotUsers";
  protected genreTable: string = "SpotGenre";
  protected albumTable: string = "SpotAlbums";
  protected albumGenreTable: string = "SpotAlbumsGenre";

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
      throw new Error(err.message);
    }
  }

  async checkGenres(genres: string[]) {
    let count = 0;
    for (const genre of genres) {
      const check = await super.getConnection().raw(`
        SELECT * 
        FROM ${this.genreTable}
        WHERE genre = '${genre}'
      `);

      if (check[0][0]) {
        count += 1;
      }
    }

    if (genres.length === count) {
      return true;
    }

    return false;
  }

  async createAlbum(id: string, name: string, band: string, genres: string[]) {
    try {
      if (!(await this.checkGenres(genres))) {
        throw new Error("Invalid genre");
      }
      await super
        .getConnection()
        .insert({
          id,
          name,
          band,
        })
        .into(this.albumTable);

      for (const genre of genres) {
        await super
          .getConnection()
          .insert({
            album: name,
            genre: genre.toUpperCase(),
          })
          .into(this.albumGenreTable);
      }
    } catch (err) {
      throw new Error("Failed to create an album");
    }
  }
}
