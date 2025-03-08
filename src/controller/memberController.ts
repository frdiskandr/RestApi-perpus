import { Request, Response } from "express";
import Services from "../services/memberServices";

async function getAllMembers(req: Request, res: Response, next: Function) {
  try {
    const result = await Services.getAllMember();
    res.json(result);
  } catch (e) {
    next(e)
  }
    
}

async function addMember(req: Request, res: Response, next: Function) { 
  try {
    const result :any = await Services.addMember(req.body);
    res.status(200).json({message: `created member ${result.name}`});
  }catch (e) {
    next(e)  
  }
}

export default { getAllMembers, addMember };