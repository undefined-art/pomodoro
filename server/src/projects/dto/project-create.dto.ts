import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  createdBy: number;
}
