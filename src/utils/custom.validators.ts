import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AccessType } from "../../src/modules/users/users.entity";

@ValidatorConstraint({ name: 'accountType', async: false })
export class ValidateAccountType implements ValidatorConstraintInterface {
  validate(accountType) {
    let AcceptedAccountTypes: AccessType[] = ['admin', 'normal']
    return AcceptedAccountTypes.includes(accountType.toLowerCase()) ? true : false
  }

  defaultMessage() {
    return "Permissão inválida.";
  }
}