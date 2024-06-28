import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La constraseña debe contener al menos un cáracter en minúscula, un número y uno de los siguientes carácteres: !@#$%^&*',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

//TODO crear una clase para actualizar el usuario
// export class UpdateUserDto {
//   @IsOptional()
//   @IsString()
//   @MinLength(3)
//   @MaxLength(80)
//   name: string;
// }

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
