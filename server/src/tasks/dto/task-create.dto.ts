import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  createdBy: number;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsNumber()
  @IsOptional()
  pomodoro: number;

  @IsDate()
  @IsOptional()
  expiredAt: string | Date;
}
