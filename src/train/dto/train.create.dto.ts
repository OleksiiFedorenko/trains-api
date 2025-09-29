import { IsString, Matches, MinLength } from 'class-validator';

export class TrainCreateDto {
  @IsString()
  @MinLength(3)
  number: string;

  @IsString()
  @MinLength(2)
  from: string;

  @IsString()
  @MinLength(2)
  to: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'departure must be in HH:MM format' })
  departure: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'arrival must be in HH:MM format' })
  arrival: string;
}
