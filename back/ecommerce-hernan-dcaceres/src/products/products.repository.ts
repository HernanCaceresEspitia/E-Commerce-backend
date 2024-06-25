import { Injectable } from '@nestjs/common';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products: Product[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Laptop',
    description: 'A high performance laptop',
    price: 999.99,
    stock: true,
    imgUrl: 'https://example.com/laptop.jpg',
  },
  {
    id: '5a4475d3-8b6b-4b4b-97ed-bdc024ec6f77',
    name: 'Smartphone',
    description: 'A latest model smartphone',
    price: 799.99,
    stock: true,
    imgUrl: 'https://example.com/smartphone.jpg',
  },
  {
    id: '3c62b5e0-9e2b-44f1-9c10-97dff29284b5',
    name: 'Headphones',
    description: 'Noise-cancelling over-ear headphones',
    price: 199.99,
    stock: false,
    imgUrl: 'https://example.com/headphones.jpg',
  },
  {
    id: 'fa87b8e3-7c50-44d2-8c9d-9f7ea714db44',
    name: 'Smartwatch',
    description: 'A stylish smartwatch with various features',
    price: 299.99,
    stock: true,
    imgUrl: 'https://example.com/smartwatch.jpg',
  },
  {
    id: 'cb4d6b6e-06f4-4f16-b3a6-69f8b2fa0e1f',
    name: 'Tablet',
    description: 'A high-resolution screen tablet',
    price: 499.99,
    stock: true,
    imgUrl: 'https://example.com/tablet.jpg',
  },
  {
    id: '1',
    name: 'Laptop',
    description: 'A high performance laptop',
    price: 999.99,
    stock: true,
    imgUrl: 'https://example.com/laptop.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  //* Obtener todos los productos

  async getProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productsList = products.slice(start, end);

    return await productsList;
  }

  //* Obtener producto por ID

  async getProductById(id: string) {
    const productFound = products.find((p) => p.id === id);
    if (!productFound) return `Producto no encontrado con ID: ${id}`;
    return productFound;
  }

  //* Crear producto

  async createProduct(product: Product) {
    products.push(product);
    return product;
  }

  //* Modificar producto

  async updateProduct(id: string, product: Product) {
    const productFound = products.findIndex((p) => p.id === id);
    if (productFound === -1) return 'Producto no encontrado';
    products[productFound] = { ...products[productFound], ...product };
    return products[productFound];
  }

  //* Eliminar producto

  async deleteProduct(id: string) {
    const productFound = products.findIndex((p) => p.id === id);
    if (productFound === -1) return 'Producto no encontrado';

    products.splice(productFound, 1);
    return `Producto con ID ${id} eliminado`;
  }
}
