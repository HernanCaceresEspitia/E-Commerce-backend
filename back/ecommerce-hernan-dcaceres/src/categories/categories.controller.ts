import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({ summary: 'Crear categorias por default' })
  addCategories() {
    return this.categorieService.addCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Ver todas las categorias' })
  getCategories() {
    return this.categorieService.getCategories();
  }
}
