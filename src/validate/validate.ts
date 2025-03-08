import {AnyObjectSchema} from 'yup'

const Validate = async (schema: AnyObjectSchema, req: any) => {
  const result = await schema.validate(req);
  if (result.error) {
    throw new Error(result.errors);
  }
  return result;
}
export default Validate;