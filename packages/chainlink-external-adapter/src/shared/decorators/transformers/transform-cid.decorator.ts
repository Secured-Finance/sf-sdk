import { Transform, TransformFnParams } from 'class-transformer';

export const TransformCID = (): PropertyDecorator => {
  return Transform(({ value }: TransformFnParams) => ({ '/': value }));
};
