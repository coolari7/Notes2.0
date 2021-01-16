import { HttpException } from "..";

// eslint-disable-next-line import/prefer-default-export
export class UpdatesNotFoundException extends HttpException {
  constructor() {
    super(400, "No Updates Sent!");
  }
}
