// import { Response, Request} from "express"

// const ErrorMiddleware = (error: any, req: Request, res: Response, next: Function) => {
//   if (error) {
//     return res.status(500).json({ message: "internal Server Error" }).end();
//   }
//   next();
// }

// export { ErrorMiddleware };

import { Request, Response, NextFunction } from "express";
import ResponseError from "../Error/ResponseError";

// Custom error interface
interface CustomError extends Error {
  status?: number; 
}

// Error-handling middleware
const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next();
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ message: JSON.parse(err.message) })
  } else if (err) {
    res.status(400).json({ message: err.message});
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorMiddleware;
