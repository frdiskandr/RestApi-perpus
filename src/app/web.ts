import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import setupSwager from './swagger';
import BookRouter from '../routes/bookRouter';
import MemberRouter from '../routes/memberRouter';
import errorMiddleware from '../middleware/ErrorMiddleware';
import notFoundHandler from '../middleware/NotFoundMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// setup swager
setupSwager(app);

//routes
app.use("/books", BookRouter)
app.use("/members", MemberRouter)

app.use(notFoundHandler)
app.use(errorMiddleware)

export default app;