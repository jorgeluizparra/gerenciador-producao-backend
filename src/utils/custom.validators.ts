import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DaysFormat } from "src/modules/opening_days/opening.days.entity";
import { AccessType } from "../../src/modules/users/users.entity";

export const AcceptedAccountTypes: AccessType[] = ['admin', 'normal']

@ValidatorConstraint({ name: 'accountType', async: false })
export class ValidateAccountType implements ValidatorConstraintInterface {
  validate(accountType) {
    return AcceptedAccountTypes.includes(accountType.toLowerCase()) ? true : false
  }

  defaultMessage() {
    return "Permissão inválida.";
  }
}

export const DaysFormatTypes: DaysFormat[] = [
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sabado-feira',
  'domingo-feira',
  'feriados'
]

@ValidatorConstraint({ name: 'dayName', async: false })
export class ValidateDayFormat implements ValidatorConstraintInterface {
  validate(dayName) {
    return DaysFormatTypes.includes(dayName.toLowerCase()) ? true : false
  }

  defaultMessage() {
    return "Permissão inválida.";
  }
}