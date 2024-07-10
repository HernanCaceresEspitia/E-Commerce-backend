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
   * @example 'e3c28103-d93f-4da7-a0f9-47351a531fa0'
   */

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [ProductIdDto],
    description: 'Lista de productos',
    example: [
      { id: 'dd1f15d6-009e-4daf-9c94-0dc3594fc7bd' },
      { id: 'f7f6d4e8-d101-4990-a16d-1b4d8e7cd1bf' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
