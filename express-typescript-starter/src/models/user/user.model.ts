import { model, Schema } from "mongoose";
import {
  IUserDoc,
  IUserModel,
  UserClass,
  UserSchemaFields,
  UserSchemaOptions,
} from ".";
import { AuthService } from "../../services";

export const UserSchema = new Schema(UserSchemaFields, UserSchemaOptions);

UserSchema.loadClass(UserClass);

// Pre Hooks
UserSchema.pre<IUserDoc>(
  "save",
  // eslint-disable-next-line no-unused-vars
  async function f(this: IUserDoc) {
    if (this.isModified("password")) {
      this.password = await AuthService.encryptPassword(this.password);
    }
  }
);

export const User = model<IUserDoc, IUserModel>("User", UserSchema, "users");
