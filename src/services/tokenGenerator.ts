import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class TokenGenerator {
  public generate = (input: AuthenticationData): string => {
    const newToken = jwt.sign(
      {
        id: input.id,
        type: input.type,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1y",
      }
    );
    return newToken;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id, type: payload.type };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
  type: string;
}
