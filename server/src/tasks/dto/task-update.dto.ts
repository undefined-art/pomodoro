import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskUpdateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsNumber()
  @IsOptional()
  projectId: number;
}
