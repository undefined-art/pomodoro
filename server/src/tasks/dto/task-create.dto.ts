import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsNumber()
  @IsOptional()
  projectId: number;

  @IsNumber()
  @IsOptional()
  pomodoro: number;

  @IsNumber()
  @IsOptional()
  createdBy: number;

  @IsNumber()
  @IsOptional()
  expiredAt: number;
}
