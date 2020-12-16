import { hash, compare } from "bcrypt";

// eslint-disable-next-line import/prefer-default-export
export class AuthService {
  public static async encryptPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  public static async decryptAndCompare(
    enteredPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const result = await compare(enteredPassword, hashedPassword);
    return result;
  }
}
