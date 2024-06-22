import { Injectable } from '@nestjs/common';
import { ProductsRespository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly porductsRepository: ProductsRespository) {}

  getProducts() {
    return this.porductsRepository.getProducts();
  }
}
