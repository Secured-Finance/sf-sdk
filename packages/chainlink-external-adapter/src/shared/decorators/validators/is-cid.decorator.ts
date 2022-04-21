import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  buildMessage,
} from 'class-validator';
import { CID } from 'multiformats';

export function IsCID(validationOptions?: ValidationOptions) {
  return function (object: { [key: string]: any }, propertyName: string): void {
    registerDecorator({
      name: 'IsCID',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _: ValidationArguments) {
          try {
            CID.parse(value && value['/']);
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a CID',
          validationOptions,
        ),
      },
    });
  };
}
