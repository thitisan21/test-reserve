import { Test, TestingModule } from '@nestjs/testing';
import { ReserveController } from './reserve.controller';
import { InitialTableDTO } from './dto/initial-table.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReserveDTO } from './dto/create-reserve.dto';
import { CancelReserveDTO } from './dto/cancel-reserve.dto';
import { ReserveService } from './reserve.service';

describe('ReserveController', () => {
    let reserveController: ReserveController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReserveService],
            controllers: [ReserveController],
        }).compile();

        reserveController = module.get<ReserveController>(ReserveController);
    });

    it('should be defined', () => {
        expect(reserveController).toBeDefined();
    });

    describe('initialTable', () => {
        let initialTableDTO: InitialTableDTO;
        it('throws a bad request exception if the file doesn not exist', async () => {
            expect(reserveController.initialTable(initialTableDTO)).rejects.toThrow(TypeError);
        });
    });

    describe('reserveTable', () => {
        let createReserveDTO: CreateReserveDTO;
        it('throws a bad request exception if the file doesn not exist', async () => {
            expect(reserveController.reserveTable(createReserveDTO)).rejects.toThrow(TypeError);
        });
    });

    describe('cencelReserveWithId', () => {
        let cancelReserveDTO: CancelReserveDTO;
        it('throws a bad request exception if the file doesn not exist', async () => {
            expect(reserveController.cencelReserveWithId(cancelReserveDTO)).rejects.toThrow(NotFoundException);
        });
    });

    describe('initialTable is success', () => {
        let initialTableDTO: InitialTableDTO = {
            amountOfTable: 2,
        };
        it('Success', async () => {
            expect(await reserveController.initialTable(initialTableDTO)).toEqual({
                status: true,
                statusMessage: 'Success',
                data: 'Create table success.',
            });
        });
    });

    describe('reserveTable is success', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 3,
            };
            await reserveController.initialTable(initialTableDTO);
        });
        let createReserveDTO: CreateReserveDTO = {
            name: 'Frank falcon',
            phoneNumber: '0899999999',
            amount: 3,
        };

        it('Success', async () => {
            let result = await reserveController.reserveTable(createReserveDTO);
            expect(result.statusMessage).toBe('Success');
        });
    });

    describe('cencelReserveWithId is success', () => {
        beforeEach(async () => {
            let initialTableDTO: InitialTableDTO = {
                amountOfTable: 3,
            };
            await reserveController.initialTable(initialTableDTO);
            let createReserveDTO: CreateReserveDTO = {
                name: 'Frank falcon',
                phoneNumber: '0899999999',
                amount: 3,
            };
            await reserveController.reserveTable(createReserveDTO);
        });
        let cancelReserveDTO: CancelReserveDTO = {
            reserveId: 'Re-1',
        };

        it('Success', async () => {
            let result = await reserveController.cencelReserveWithId(cancelReserveDTO);
            expect(result.statusMessage).toBe('Success');
        });
    });
});
