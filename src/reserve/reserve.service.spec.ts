import { Test, TestingModule } from '@nestjs/testing';
import { ReserveService } from './reserve.service';
import { InitialTableDTO } from './dto/initial-table.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReserveDTO } from './dto/create-reserve.dto';
import { CancelReserveDTO } from './dto/cancel-reserve.dto';

describe('ReserveService', () => {
    let reserveService: ReserveService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReserveService],
        }).compile();

        reserveService = module.get<ReserveService>(ReserveService);
    });

    it('should be defined', () => {
        expect(reserveService).toBeDefined();
    });

    describe('initialTable is fail because initial more 1 time.', () => {
        let initialTableDTO: InitialTableDTO = {
            amountOfTable: 2,
        };
        it('Fail', async () => {
            await reserveService.initialTable(initialTableDTO);
            expect(reserveService.initialTable(initialTableDTO)).rejects.toThrow(BadRequestException);
        });
    });

    describe('reserveTable is success.', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 3,
            };
            await reserveService.initialTable(initialTableDTO);
        });
        it('Success', async () => {
            let createReserveDTO: CreateReserveDTO = {
                name: 'Frank falcon',
                phoneNumber: '0899999999',
                amount: 2,
            };
            await reserveService.reserveTable(createReserveDTO);
            createReserveDTO = {
                name: 'Frank falcon1',
                phoneNumber: '0899999999',
                amount: 6,
            };
            let result = await reserveService.reserveTable(createReserveDTO);
            expect(result.status).toBe(true);
            expect(result.statusMessage).toBe('Success');
            expect(result.data.reserveId).toBeDefined();
            expect(result.data.table).toContain('2');
        });
    });

    describe('reserveTable is fail because amount is more than seat.', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 1,
            };
            await reserveService.initialTable(initialTableDTO);
        });
        let createReserveDTO: CreateReserveDTO = {
            name: 'Frank falcon',
            phoneNumber: '0899999999',
            amount: 5,
        };

        it('Fail condition 1', async () => {
            expect(reserveService.reserveTable(createReserveDTO)).rejects.toThrow(BadRequestException);
        });
    });

    describe('reserveTable is fail because amount is more than seat.', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 1,
            };
            await reserveService.initialTable(initialTableDTO);
        });
        it('Fail condition 2', async () => {
            let createReserveDTO: CreateReserveDTO = {
                name: 'Frank falcon',
                phoneNumber: '0899999999',
                amount: 3,
            };
            await reserveService.reserveTable(createReserveDTO);
            createReserveDTO = {
                name: 'Frank falcon1',
                phoneNumber: '0899999999',
                amount: 4,
            };
            expect(reserveService.reserveTable(createReserveDTO)).rejects.toThrow(BadRequestException);
        });
    });
    describe('reserveTable is fail because amount id not found.', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 1,
            };
            await reserveService.initialTable(initialTableDTO);
            let createReserveDTO: CreateReserveDTO = {
                name: 'Frank falcon',
                phoneNumber: '0899999999',
                amount: 3,
            };
            await reserveService.reserveTable(createReserveDTO);
        });
        let cancelReserveDTO: CancelReserveDTO = {
            reserveId: 'Re-2',
        };

        it('Fail', async () => {
            expect(reserveService.cencelReserveWithId(cancelReserveDTO)).rejects.toThrow(NotFoundException);
        });
    });
});
