import { ArrayMaxSize, IsArray, IsString, MinLength } from 'class-validator';

export class BulkHistoryDto {
  @IsArray()
  @ArrayMaxSize(64)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  queries!: string[];
}
