import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoiresModule } from './categories/categoires.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { Categories } from './entities/categories.entity';
import { Products } from './entities/products.entity';
import { CategoriesRepository } from './categories/categories.repository';
import { ProductsRepository } from './products/products.repository';
import { OrderDetaiils } from './entities/orderdetails.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoiresModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([Categories, Products, OrderDetaiils]),
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesRepository, ProductsRepository],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    await this.categoriesRepository.addCategories();
    await this.productsRepository.createSeederProducts();
  }
}
