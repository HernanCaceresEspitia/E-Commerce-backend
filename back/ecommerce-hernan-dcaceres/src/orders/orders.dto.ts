import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ProductIdDto {
  @IsUUID()
  id: string;
}
export class CreateOrderDto {
  /**
   * Debe ser un string
   * @example '27d378c6-3dc2-4a29-8a41-740f97701013'
   */

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [ProductIdDto],
    description: 'Lista de productos',
    example: [
      { id: '112992d8-acf3-453e-8d4c-d24aa615730f' },
      { id: '5e8ab8cf-ef8c-4b2d-86ae-03d036e093b2' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
