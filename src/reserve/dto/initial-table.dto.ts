import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class InitialTableDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amountOfTable: number;
}
