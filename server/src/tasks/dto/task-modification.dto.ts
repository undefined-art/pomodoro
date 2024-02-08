import { IsNotEmpty, IsOptional } from 'class-validator';

export class TaskModificationDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  completed: boolean;

  @IsOptional()
  createdBy: number;
}
