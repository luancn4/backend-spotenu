import { BaseError } from "./BaseError/BaseError";

export class InvalidEmailError extends BaseError {
  constructor(message: string) {
    super(message, 416);
  }
}
