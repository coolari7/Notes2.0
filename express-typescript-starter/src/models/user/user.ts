/* eslint-disable no-unused-vars */
import { promisify } from "util";
import isEmail from "validator/lib/isEmail";
import { FilterQuery, SchemaOptions, SchemaTypeOptions } from "mongoose";
import { capitalizeFirstCharacter, ModDate } from "../../utils";
import { IUser, IUserDoc } from ".";

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
    return promisify<FilterQuery<IUser>, number>(
      this.model("User").countDocuments
    )({ birthDate: this.birthDate });
  }

  public static async newMonthlyUsers(this: IUserDoc): Promise<number> {
    const date = new ModDate();
    return promisify<FilterQuery<IUser>, number>(
      this.model("User").countDocuments
    )({
      $and: [
        { createdAt: { $gte: date.getFirstDateOfTheMonth() } },
        { createdAt: { $lt: date.getFirstDateOfNextMonth() } },
      ],
    });
  }
}

export const UserSchemaFields: Record<keyof IUser, SchemaTypeOptions<any>> = {
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
    select: false,
    unique: true,
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
