import express, { Router, Request, Response, NextFunction } from "express";
import { BaseController } from "../index";
import { IUser, User, UserSchemaDefinition } from "../../models";
import {
  UserNotFoundException,
  UpdatesNotFoundException,
  WrongUpdatesException,
} from "../../shared";

// eslint-disable-next-line import/prefer-default-export
export class UserController implements BaseController {
  public router: Router = express.Router();
  public path: string = "/users";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/:username`, UserController.readUser);
    this.router.post(this.path, UserController.createUser);
    this.router.patch(`${this.path}/:username`, UserController.updateUser);
    this.router.delete(`${this.path}/:username`, UserController.deleteUser);
  }

  private static async readUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any>> {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username }, "+password +email");
      if (!user) {
        return next(new UserNotFoundException(username));
      }

      /* METHOD */
      const sameBirthDateCount = await user.sameBirthDateCount();

      /* STATIC */
      const newMonthlyUsers = await User.newMonthlyUsers();

      return res.status(200).send(
        user.toJSON({
          /* INLINE TRANSFORM */
          transform: (_doc, ret) => {
            const copy = ret;
            delete copy.firstName;
            delete copy.lastName;
            return {
              ...copy,
              sameBirthDateCount,
              newMonthlyUsers,
            };
          },
        })
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error);
    }
  }

  private static async createUser(req: Request, res: Response): Promise<void> {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  private static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any>> {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return next(new UserNotFoundException(username));
      }
      const updates = Object.keys(req.body);
      if (updates.length < 1) {
        return next(new UpdatesNotFoundException());
      }
      const allowedUpdates = Object.keys(UserSchemaDefinition);
      if (!updates.every((update) => allowedUpdates.includes(update))) {
        return next(new WrongUpdatesException());
      }
      updates.forEach((update) => {
        user[update as keyof IUser] = req.body[update];
      });
      await user.save();
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  private static async deleteUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const user = await User.findOneAndDelete({ username });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
