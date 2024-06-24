import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {}

  @Post()
  createProduct(@Body() user: any) {}

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() user: any) {}

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {}
}
