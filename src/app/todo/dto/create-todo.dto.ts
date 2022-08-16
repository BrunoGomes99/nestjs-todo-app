import { IsIn, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
    @IsNotEmpty()
    @ApiProperty()
    task: string;

    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsIn([0, 1]) // Valida se o campo em questão possui um dos valores definidos no array
    isDone: number;
}