import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeValidatorPipe } from './minSizeValidator.pipe';
import { CloudinaryService } from './cloudinary.service';
import { ProductsService } from 'src/products/products.service';
import { MaxSizeValidatorPipe } from './maxSizeValidator.pipe';
import { FileTypeValidatorPipe } from './FileTypeValidator.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload Files')
@Controller('files')
export class FileUploadController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}
  //*Capturar la imagen
  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(MinSizeValidatorPipe, MaxSizeValidatorPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @Param('productId')
    productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Archivo no subido');
    }
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      await this.productsService.updateProductImage(
        productId,
        result.secure_url,
      );
      return {
        message: 'Imagen cargada correctamente',
        url: result.secure_url,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
