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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsDto, updateProduct } from './products.dto';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de elementos por página',
    example: '15',
  })
  @ApiOperation({ summary: 'Ver todos los productos' })
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.productService.getProducts(Number(page), Number(limit));
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Agregar todos los productos por default' })
  addProducts() {
    return this.productService.createProduct();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID y ver sus detalles' })
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear un producto único' })
  createOneProduct(@Body() product: ProductsDto) {
    return this.productService.createSingleProduct(product);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Modificar producto' })
  updateProduct(@Param('id') id: string, @Body() product: updateProduct) {
    return this.productService.updateProduct(id, product);
  }

  @ApiBearerAuth()
  @Delete('all')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Borrar TODOS los productos' })
  deleteAllProducts() {
    return this.productService.deleteAllProducts();
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Borrar producto' })
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
