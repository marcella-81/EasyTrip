import { IsString, MinLength } from 'class-validator';

export class AddHistoryDto {
  @IsString()
  @MinLength(1)
  query!: string;
}
