import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { log } from 'console';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    const existingCategories = await this.categoriesRepository.find();
    if (existingCategories.length > 0) {
      console.log('Categorias ya cargadas en la base de datos');
      return 'Categorias ya cargadas en la base de datos';
    }
    data?.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    console.log('Categorías ya cargadas');
    return 'Categorias agregadas';
  }
}
