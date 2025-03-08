import { PrismaClient } from "@prisma/client";
import Validate from "../validate/validate";
import schema  from "../validate/schema/bookSchema";

const prisma = new PrismaClient();

async function GetAllBooks() {
  return await prisma.book.findMany();
}

async function AddBook(req: any) {
  const data = await Validate(schema.bookSchema, req);

  return await prisma.book.create({
    data: {
      code: data.code,
      title: data.title,
      author: data.author,
      stock: data.stock
    },
  })
}

async function borrowBook(req: any) {
  const data = await Validate(schema.Book, req);

  const member = await prisma.member.findUnique({
    where: {
      id: data.memberId
    },
    include: {
      penalties: true
    }
  })

  if (!member) {
    return {
      message: "Member not found"
    }
  }
  if(member.penalties.length > 0) {
    return {
      message: "Member has outstanding penalties"
    }
  }

  const book = await prisma.book.findUnique({
    where: {
      id: data.bookId
    }
  })

  if (!book) { 
    return {
      message: "Book not found"
    }
  }
  if (book.stock <= 0) {
    return {
      message: "Book is out of stock"
    }
  }

  await prisma.borrow.create({
    data: {
      memberId: data.memberId,
      bookId: data.bookId
    }
  })

  await prisma.book.update({
    where: {
      id: data.bookId
    },
    data: {
      stock: book.stock - 1
    }
  })

  return {
    message: "Book borrowed successfully"
  }
}

const returnBook = async (req: any) => {
  const data = await Validate(schema.Book, req);

  const member = await prisma.member.findUnique({
    where: {
      id: data.memberId
    },
    include: {
      borrowed:true
    }
  })

  if (!member) {
    return {
      message: "Member not found"
    }
  }

  const borrow = await prisma.borrow.findFirst({
    where: {
      memberId: data.memberId,
      bookId: data.bookId
    }
  })

  if (!borrow) {
    return {
      message: "No active borrow found"
    }
  }

  const returnDate = new Date();
  const borrowDate = new Date(borrow.borrowDate);
  const daysBorrowed = Math.ceil((returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24));

  await prisma.borrow.update({
    where: { id: borrow.id },
    data: { returnDate },
  });

  await prisma.book.update({
    where: { id: data.bookId },
    data: { stock: { increment: 1 } },
  });

  if (daysBorrowed > 7) {
    await prisma.penalty.create({
      data: {
        memberId: data.memberId,
        startDate: returnDate,
        endDate: new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      },
    });
  }

  return {
    message: "Book returned successfully"
  }

}


export default {
  GetAllBooks,
  AddBook,
  borrowBook,
  returnBook
}