import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.productService.getProducts(Number(page), Number(limit));
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: any) {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
