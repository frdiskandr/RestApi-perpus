import { NextFunction, Request, Response } from "express";
import Prisma from "../app/database";
import Validate from "../validate/validate";
import memberSchema, { MemberType } from "../validate/schema/memberSchema";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "GET") {
    return next();
  }

  Validate(memberSchema, req.body)
    .then((data: MemberType) => {
      return Prisma.member.findFirst({
        where: { code: data.code, name: data.name },
      });
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      next();
    })
    .catch((error) => next(error));
};

export default userMiddleware;
