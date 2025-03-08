import Prisma from "../app/database";
import Validate from "../validate/validate";
import memberSchema from "../validate/schema/memberSchema";
import { MemberType } from "../validate/schema/memberSchema";
import { Request } from "express";

const addMember = async (req: Request) => {
  const data: MemberType = await Validate(memberSchema, req);

  return await Prisma.member.create({
    data: {
      code: data.code,
      name: data.name
    }
  })
}

const getAllMember = async () => {
  return await Prisma.member.findMany({
    include: {
      borrowed: true,
      penalties:true
    }
  });
}

export default { addMember, getAllMember }