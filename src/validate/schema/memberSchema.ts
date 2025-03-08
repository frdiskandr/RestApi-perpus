import * as yup from "yup";

const memberSchema = yup.object({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
})

export type MemberType = yup.InferType<typeof memberSchema>;

export default memberSchema;