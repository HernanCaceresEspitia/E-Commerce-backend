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
   * @example '504a67fa-0535-4e38-91bb-2a67bc2f6248'
   */

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [ProductIdDto],
    description: 'Lista de productos',
    example: [
      { id: 'cd024838-d970-479a-8bbd-09a5ff89d67e' },
      { id: '31488344-6306-4c96-bea9-fd0bcf61686f' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
