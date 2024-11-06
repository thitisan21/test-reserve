import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CancelReserveDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reserveId: string;
}

