import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileTypeValidatorPipe implements PipeTransform {
  private allowedTypes = [/(jgp|jpeg|png|webp)/];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.allowedTypes.includes(value.mimetype)) {
      throw new BadRequestException(
        'Tipo de archivo no permitido. Solo se permiten JPEG, PNG y GIF.',
      );
    }
    return value;
  }
}
