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
import { OrderDetaiils } from 'src/entities/orderdetails.entity';

@Injectable()
export class ProductsRepository {
  //* Obtener todos los productos
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(OrderDetaiils)
    private orderDetailsRepository: Repository<OrderDetaiils>,
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

  //! Crear producto desde el seeder

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
      console.log('Todos los productos ya están existen en la base de datos.');
      return 'Productos ya existentes en la base de datos. Productos no agregados';
    }

    console.log(`Productos agregados exitosamente`);

    return 'Productos agregados';
  }

  //! Crear producto personalizado

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

  //! Eliminar todos los productos

  async deleteAllProducts() {
    //* Busca todos los productos

    const products = await this.productsRepository.find();

    if (products.length === 0) {
      throw new NotFoundException('No hay productos en la base de datos');
    }

    //*Verifica si hay productos asociados a órdenes

    const orderDetails = await this.orderDetailsRepository.find({
      relations: ['products'],
    });

    const productsInOrders = new Set<string>();

    orderDetails.forEach((orderDetail) => {
      orderDetail.products.forEach((product) => {
        productsInOrders.add(product.id);
      });
    });

    if (productsInOrders.size > 0) {
      console.warn(
        `Aviso: Hay productos asociados a órdenes. Se procederá a eliminarlos igualmente.`,
      );
    }

    //* Eliminar las referencias a los productos en ORDERDETAILS_PRODUCTS
    await this.orderDetailsRepository
      .createQueryBuilder()
      .relation(OrderDetaiils, 'products')
      .of(orderDetails.map((orderDetail) => orderDetail.id))
      .remove(orderDetails.map((orderDetail) => orderDetail.products));

    //* Eliminar los detalles de las órdenes asociadas a los productos

    await this.orderDetailsRepository
      .createQueryBuilder()
      .delete()
      .where('order_id IS NOT NULL')
      .execute();

    //* Eliminiar los productos de la BD
    await this.productsRepository.createQueryBuilder().delete().execute();

    return 'Todos los prodcutos han sido eliminados exitosamente';
  }
}
