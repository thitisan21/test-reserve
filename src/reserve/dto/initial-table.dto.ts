import { IsNotEmpty, IsNumber } from 'class-validator';

export class InitialTableDTO {
    @IsNotEmpty()
    @IsNumber()
    amountOfTable: number;
}
