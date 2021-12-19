import { Request, Response } from "express";
import { User } from "../schemas";

export interface Context {
  req: Request;
  res: Response;
  user: User;
}
