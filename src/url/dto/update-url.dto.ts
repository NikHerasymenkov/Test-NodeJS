import { PartialType } from '@nestjs/mapped-types';
import { ProcessUrlDto } from './process-url.dto';

export class UpdateUrlDto extends PartialType(ProcessUrlDto) {}
