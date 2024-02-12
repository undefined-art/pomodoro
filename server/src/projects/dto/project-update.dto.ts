import { IsOptional, IsString } from 'class-validator';

export class ProjectUpdateDto {
  @IsString()
  @IsOptional()
  title: string;
}
