import { Document, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
  username: string;
}

export interface IUserDoc extends IUser, Document {
  age: number;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  sameBirthDateCount(): Promise<number>;
}

export interface IUserModel extends Model<IUserDoc> {
  newMonthlyUsers(): Promise<number>;
}
