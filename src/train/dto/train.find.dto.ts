import { IsOptional, IsString, MinLength } from 'class-validator';

export class TrainFindDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  number?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  city?: string;
}
