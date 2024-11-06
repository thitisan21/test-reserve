import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateReserveDTO } from './dto/create-reserve.dto';
import { ReserveService } from './reserve.service';
import { InitialTableDTO } from './dto/initial-table.dto';
import { CancelReserveDTO } from './dto/cancel-reserve.dto';

@Controller('reserve')
export class ReserveController {
    constructor(private readonly reserveService: ReserveService) {}

    @Post('/initial')
    async initialTable(@Body() initialTableDTO: InitialTableDTO) {
        return await this.reserveService.initialTable(initialTableDTO);
    }

    @Post('/')
    async reserveTable(@Body() createReserveDTO: CreateReserveDTO) {
        return await this.reserveService.reserveTable(createReserveDTO);
    }

    @Patch('/cancel')
    async cencelReserveWithId(@Body() cancelReserveDTO: CancelReserveDTO) {
        return await this.reserveService.cencelReserveWithId(cancelReserveDTO);
    }
}
