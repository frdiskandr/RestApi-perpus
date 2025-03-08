import { PrismaClient } from "@prisma/client";
import Logger from "./logger";

const Prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    }
] });

Prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  const duration = after - before;
  Logger.info(`${params.model}.${params.action} took ${duration}ms`);
  return result;
});

Prisma.$on("query", (e) => {
  Logger.info(e.query);
  Logger.info(e.params);
});

Prisma.$on("error", (e) => {
  Logger.error(e);
});


export default Prisma;