import { IsString, Length, MinLength } from 'class-validator';

export class AddVisitedDto {
  @IsString()
  @Length(2, 2)
  cca2!: string;

  @IsString()
  @MinLength(1)
  countryName!: string;

  @IsString()
  @MinLength(1)
  continent!: string;
}
