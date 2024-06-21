import { NextFunction, Request, Response } from "express";
import userModel from "./userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // validation
  //   console.log("request :", req.body);
  const { name, email, password } = req.body;
  // validation

  // Database se me search karna hai
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const err = createHttpError(400, "user Already existed");
      return next(err);
    }
    console.log("found user");
  } catch (error) {
    return next(createHttpError(500, "error in finding user"));
    // console.log("error in finding user", error);
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    // response
    res.json({
      "access token": token,
    });
  } catch (error) {
    return next(createHttpError(500, "error in creating user"));
  }
  // process
};

export { createUser };
