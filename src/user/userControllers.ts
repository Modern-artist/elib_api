import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // validation
  console.log("request :", req.body);
  const { name, email, password } = req.body;
  // validation

  // process
  // response
  res.json({
    message: "created User",
  });
};

export { createUser };
