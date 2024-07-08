import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ProductsDto {
  /**
   * Debe ser un string de máximo 80 carácteres
   * @example 'Master Chief Keyboard 117'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string de máximo 80 caráctres
   * @example 'Teclado mecánico personalizado Halo Infinite versión Master Chief'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  description: string;

  /**
   * Debe ser un número
   * @example 50.49
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * Debe ser un número
   * @example 10
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   *Debe ser una URL (string) para la imagen
   *@example 'https://http2.mlstatic.com/D_NQ_NP_2X_870935-MLU71559805976_092023-F.webp'
   */
  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  /**
   * Debe ser un string dentro de las siguientes categorias: 'smartphone', 'monitor', 'keyboard' o 'mouse'.
   * @example 'mouse'
   */
  @IsNotEmpty()
  category: string;
}

export class updateProduct extends PickType(ProductsDto, [
  'price',
  'stock',
  'description',
]) {}
