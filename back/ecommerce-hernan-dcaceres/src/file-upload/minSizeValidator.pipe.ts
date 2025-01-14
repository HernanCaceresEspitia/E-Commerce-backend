import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 10000;
    console.log(metadata);

    if (value.size < minSize) {
      throw new BadRequestException('Tamaño de archivo muy pequeño');
    }
    return value;
  }
}
