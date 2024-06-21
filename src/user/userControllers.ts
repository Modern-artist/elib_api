import { NextFunction, Request, Response } from "express";
import userModel from "./userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // validation
  console.log("request :", req.body);
  const { name, email, password } = req.body;
  // validation

  // Database se me search karna hai
  const user = await userModel.findOne({ email });

  if (user) {
    const err = createHttpError(400, "user Already existed");
    return next(err);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  // process
  // response
  res.json({
    message: "created User",
  });
};

export { createUser };
