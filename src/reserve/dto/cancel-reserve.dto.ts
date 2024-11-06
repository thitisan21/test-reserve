import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CancelReserveDTO {
    @IsNotEmpty()
    @IsString()
    reserveId: string;
}
