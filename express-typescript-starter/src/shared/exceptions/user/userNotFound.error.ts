import { HttpException } from "..";

// eslint-disable-next-line import/prefer-default-export
export class UserNotFoundException extends HttpException {
  constructor(username: string) {
    super(404, `User with username ${username} Not Found!`);
  }
}
