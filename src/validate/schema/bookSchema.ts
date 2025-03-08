import * as yup from "yup";

const bookSchema = yup.object({
  code: yup.string().required("Code is required"),
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  stock: yup.number().integer().min(0).required("Stock must be a positive integer"),
});

const Book = yup.object({
  memberId: yup.string().required("memberId is required"),
  bookId: yup.string().required("bookId is required"),
})

export type BookType = yup.InferType<typeof bookSchema>;
export default {bookSchema, Book};