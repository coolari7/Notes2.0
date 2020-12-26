import { model, Schema } from "mongoose";
import {
  IUserDoc,
  IUserModel,
  UserClass,
  UserSchemaDefinition,
  UserSchemaOptions,
} from ".";
import { AuthService } from "../../services";

export const UserSchema = new Schema(UserSchemaDefinition, UserSchemaOptions);

UserSchema.loadClass(UserClass);

/* PRE HOOKS */
// eslint-disable-next-line no-unused-vars
UserSchema.pre<IUserDoc>("save", async function f(this: IUserDoc) {
  if (this.isModified("password")) {
    this.password = await AuthService.encryptPassword(this.password);
  }
});

export const User = model<IUserDoc, IUserModel>("User", UserSchema, "users");
