import { HttpException } from "..";

// eslint-disable-next-line import/prefer-default-export
export class WrongUpdatesException extends HttpException {
  constructor() {
    super(400, "Incorrect Updates!");
  }
}
