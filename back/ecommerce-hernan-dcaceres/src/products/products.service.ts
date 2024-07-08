import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/products.entity';
import { ProductsDto, updateProduct } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  //! Obtener todos los productos

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  //! Obtener un producto por su ID

  async getProductById(id: string) {
    const product = await this.productsRepository.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  //! Crear productos desde el seeder

  createProduct() {
    return this.productsRepository.createSeederProducts();
  }

  //! Crear un solo producto

  createSingleProduct(product: ProductsDto) {
    return this.productsRepository.createSingleProduct(product);
  }

  //! Modificar información del producto

  updateProduct(id: string, product: updateProduct) {
    return this.productsRepository.updateProduct(id, product);
  }

  //! Modificar imagen del producto

  async updateProductImage(productId: string, imgUrl: string) {
    const product = await this.getProductById(productId);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    product.imgUrl = imgUrl;
    await this.productsRepository.updateProduct(productId, product);
  }

  //! Eliminar producto

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
