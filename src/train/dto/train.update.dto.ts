import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class TrainUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  number?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  from?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  to?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'departure must be in HH:MM format' })
  departure?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'arrival must be in HH:MM format' })
  arrival?: string;
}
