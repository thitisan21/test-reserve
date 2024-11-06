import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReserveDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
