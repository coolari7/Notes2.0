// eslint-disable-next-line import/prefer-default-export
export class HttpException extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
