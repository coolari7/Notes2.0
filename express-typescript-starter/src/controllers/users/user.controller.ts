import express, { Router, Request, Response } from "express";
import { Controller } from "../interface/controller.interface";
import { IUser, User } from "../../models";

// eslint-disable-next-line import/prefer-default-export
export class UserController implements Controller {
  public router: Router = express.Router();
  public path: string = "/users";

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, UserController.createUser);
    this.router.get(`${this.path}/:username`, UserController.readUser);
    this.router.patch(`${this.path}/:username`, UserController.updateUser);
    this.router.delete(`${this.path}/:username`, UserController.deleteUser);
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

  private static async readUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username }, "+password +email");
      if (!user) {
        res.status(404).send();
        return;
      }

      /* METHOD */
      const sameBirthDateCount = await user.sameBirthDateCount();

      /* STATIC */
      const newMonthlyUsers = await User.newMonthlyUsers();

      res.status(200).send(
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
      res.status(500).send(error);
    }
  }

  private static async updateUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        res.status(404).send("Object not found!");
        return;
      }
      const updates = Object.keys(req.body);
      if (updates.length < 1) {
        res.status(400).send("No updates sent!");
      }
      updates.forEach((update) => {
        user[update as keyof IUser] = req.body[update];
      });
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
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
