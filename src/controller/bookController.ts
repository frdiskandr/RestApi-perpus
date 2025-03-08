import { Request, RequestHandler, Response} from 'express';
import Logger from "../app/logger";
import Services from "../services/bookServices";
import Validate from '../validate/validate';
import bookSchema, { BookType }  from '../validate/schema/bookSchema';


const getAllBooks = async (req: Request, res: Response) => {
  try {
    const response = await Services.GetAllBooks();
    res.status(200).json(response);
    return
  }catch (error) {
    Logger.error(error);
  }
}

const addBook = async (req: Request, res: Response, next: Function) => {
  try {
    const response = await Services.AddBook(req.body);
    res.status(200).json({message:`created book with title ${response.title}`});
  } catch (e) {
    next(e)
  }
}

const borrowBook = async (req: Request, res: Response, next: Function) => { 
  try {
    const response = await Services.borrowBook(req.body);
    res.status(200).json(response);
  }catch (e) {
    next(e)
  }
}

const returnBook = async (req: Request, res: Response, next: Function) => { 
  try {
    const response = await Services.returnBook(req.body);
    res.status(200).json(response);
  }catch (e) {
    next(e)
  }
}


export default { getAllBooks, addBook, borrowBook, returnBook };

