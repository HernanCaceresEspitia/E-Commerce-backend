import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRespository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRespository],
})
export class ProductsModule {}
