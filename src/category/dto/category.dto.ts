import { IsNotEmpty } from "class-validator";

export class FindCategoryResponseDto {
  id: number;
  name: string;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
}
