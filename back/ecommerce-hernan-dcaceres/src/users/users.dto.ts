import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * Debe ser un string entre 3 y 80 carácteres
   * @example 'Test User'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string con formato email válido
   * @example 'test@mail.com'
   */

  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe contener entre 8 y 15 carácteres e incluir una minuscula, mayúscula, un número y un carácter especial (* # $ % &)
   * @example 'Test*1234'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  password: string;

  /**
   * Debe coincidir con el password
   * @example 'Test*1234'
   */

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser entre 4 y 80 carácteres
   * @example 'Cl 100 # 50 - 25'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número
   * @example 5554442233
   */

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe contener entre 4 y 20 carácteres
   * @example 'Test Country'
   */

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Debe contener entre 4 y 20 carácteres
   * @example 'Test City'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'address',
  'city',
  'country',
]) {}
