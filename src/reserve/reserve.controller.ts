import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateReserveDTO } from './dto/create-reserve.dto';
import { ReserveService } from './reserve.service';
import { InitialTableDTO } from './dto/initial-table.dto';
import { CancelReserveDTO } from './dto/cancel-reserve.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('reserve')
export class ReserveController {
    constructor(private readonly reserveService: ReserveService) {}

    @Post('/initial')
    @ApiResponse({
        status: 201,
        description: 'Create table success.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad resquest.',
    })
    async initialTable(@Body() initialTableDTO: InitialTableDTO) {
        return await this.reserveService.initialTable(initialTableDTO);
    }

    @Post('/')
    @ApiResponse({
        status: 201,
        description: 'Reserve success return reeserveId and tableNo.',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad resquest.',
    })
    async reserveTable(@Body() createReserveDTO: CreateReserveDTO) {
        return await this.reserveService.reserveTable(createReserveDTO);
    }

    @Patch('/cancel')
    @ApiResponse({
        status: 201,
        description: 'Cancel success.',
    })
    @ApiResponse({
        status: 404,
        description: 'Id not found.',
    })
    async cencelReserveWithId(@Body() cancelReserveDTO: CancelReserveDTO) {
        return await this.reserveService.cencelReserveWithId(cancelReserveDTO);
    }
}
