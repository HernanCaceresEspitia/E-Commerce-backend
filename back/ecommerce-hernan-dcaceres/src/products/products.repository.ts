import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { ProductsDto, updateProduct } from './products.dto';

@Injectable()
export class ProductsRepository {
  //* Obtener todos los productos
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  //! Obtener todos los productos

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  //! Obtener producto por ID

  async getProductById(id: string): Promise<Products | null> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ${id} no encontrado`);
    }
    return product;
  }

  //! Crear producto

  async createSeederProducts() {
    //* Verificar la existencia de la categoria

    const categories = await this.categoriesRepository.find();
    if (!categories.length)
      throw new BadRequestException(
        'No hay categorias. Agregar primero las categorias',
      );

    let productsAlreadyLoaded = true;

    for (const element of data) {
      const existingProduct = await this.productsRepository.findOneBy({
        name: element.name,
      });

      if (!existingProduct) {
        productsAlreadyLoaded = false;
      }
    }

    for (const element of data) {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      //* Crear nuevo producto y establecer atributos

      if (category) {
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        //*Grabar el nuevo producto en la base de datos

        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }
    }

    if (productsAlreadyLoaded) {
      console.log('Todos los productos ya están cargados en la base de datos.');
      return 'Productos ya existentes en la base de datos.';
    }

    return 'Productos agregados';
  }

  async createSingleProduct(productDto: ProductsDto) {
    //*Verificar la categoría

    const categories = await this.categoriesRepository.find();
    if (!categories.length) {
      throw new BadRequestException(
        'No hay categorías. Agregar categorías primero',
      );
    }
    const category = categories.find(
      (category) => category.name === productDto.category,
    );

    if (!category) {
      throw new BadRequestException(
        `Categoria ${productDto.category} no existe.`,
      );
    }
    //* Crear nuevo producto y establecer atributos
    const product = new Products();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.imgUrl = productDto.imgUrl;
    product.stock = productDto.stock;
    product.category = category;

    //* Grabar en la base de datos el nuevo producto

    await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(product)
      .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
      .execute();

    return `Producto '${product.name}' agregado exitosamene`;
  }

  //! Modificar producto

  async updateProduct(id: string, product: updateProduct) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({
      id,
    });
    return updatedProduct;
  }

  //! Eliminar producto

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ${id} no encontrado`);
    }

    await this.productsRepository.delete(id);
    return `Producto con ID: ${id} eliminado exitosamente`;
  }
}
