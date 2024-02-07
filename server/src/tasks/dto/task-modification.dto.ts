import { IsNotEmpty } from 'class-validator';

export class TaskModificationDto {
  @IsNotEmpty()
  title: string;

  completed: boolean;
}
