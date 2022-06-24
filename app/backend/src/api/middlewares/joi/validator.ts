import { Schema } from 'joi';

export default function validateInput<T>(schema: Schema, input: T) {
  const { error } = schema.validate(input);
  if (error) throw error;
}
