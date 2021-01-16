/* eslint-disable no-unused-vars */
import isEmail from "validator/lib/isEmail";
import { SchemaOptions, SchemaTypeOptions } from "mongoose";
import { capitalizeFirstCharacter } from "../../shared";
import { IUser, IUserDoc, User } from ".";

export class UserClass implements IUser {
  public firstName!: string;
  public lastName!: string;
  public birthDate!: Date;
  public email!: string;
  public username!: string;
  public password!: string;

  get age(): number {
    return Math.floor(
      (Date.now() - this.birthDate.valueOf()) / (1000 * 60 * 60 * 24 * 365)
    );
  }

  get fullName(): string {
    return `${capitalizeFirstCharacter(
      this.firstName
    )} ${capitalizeFirstCharacter(this.lastName)}`;
  }

  public async sameBirthDateCount(this: IUserDoc): Promise<number> {
    const count = await User.countDocuments({ birthDate: this.birthDate });
    return count - 1;
  }

  public static async newMonthlyUsers(this: IUserDoc): Promise<number> {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    return User.countDocuments({
      $and: [
        { createdAt: { $gte: new Date(year, month, 1) } },
        { createdAt: { $lt: new Date(year, month + 1, 1) } },
      ],
    });
  }
}

export const UserSchemaDefinition: Record<
  keyof IUser,
  SchemaTypeOptions<any>
> = {
  firstName: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    default: "",
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    select: false,
    validate: [
      (email: string) => isEmail(email),
      "Provided email is of incorrect format!",
    ],
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    maxlength: 20,
    required: true,
    select: false,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    immutable: true,
  },
};

export const UserSchemaOptions: SchemaOptions = {
  minimize: false,
  timestamps: true,
  versionKey: false,
  id: false,
  toJSON: {
    virtuals: true,
  },
};
