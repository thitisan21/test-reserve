import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReserveDTO } from './dto/create-reserve.dto';
import { InitialTableDTO } from './dto/initial-table.dto';
import { CancelReserveDTO } from './dto/cancel-reserve.dto';
import { IResponse } from 'src/shared/interfaces';

@Injectable()
export class ReserveService {
    private arrReserve = [];
    private arrTableDetail = [];
    private arrTable = [];

    async initialTable(initialTableDTO: InitialTableDTO): Promise<IResponse> {
        let response: IResponse = {
            status: true,
            statusMessage: 'Success',
            data: null,
        };
        if (this.arrTable.length !== 0) {
            response.status = false;
            response.statusMessage = 'Table has been created.';
            throw new BadRequestException(response);
        }
        for (let i = 0; i < initialTableDTO.amountOfTable; i++) {
            this.arrTable.push({
                tableId: i + 1,
                amountOfSeat: 4,
                isActive: true,
            });
        }
        response.data = 'Create table success.';
        return response;
    }

    async reserveTable(createReserveDTO: CreateReserveDTO): Promise<IResponse> {
        let response: IResponse = {
            status: true,
            statusMessage: 'Success',
            data: null,
        };
        let checkAva = await this.checkTableIsAvliable(createReserveDTO.amount);
        // console.log(checkAva)
        if (typeof checkAva !== 'boolean') {
            response.status = false;
            response.statusMessage = checkAva;
            throw new BadRequestException(response);
        }
        let dataInsertReserve = {
            reserveId: this.arrReserve.length === 0 ? `Re-${1}` : `Re-${this.arrReserve.length + 1}`,
            name: createReserveDTO.name,
            phoneNumber: createReserveDTO.phoneNumber,
            amountOfPeople: createReserveDTO.amount,
            status: '1000',
        };
        this.arrReserve.push(dataInsertReserve);

        // filter table detail is not cancel for remove list of main table.
        let checkTable = this.arrTableDetail.filter((item) => item.status !== '9000');
        let tableAva = this.arrTable.filter((item) => {
            let removeUsedTb = checkTable.find((itm) => itm.tableId === item.tableId);
            if (!removeUsedTb) return item;
        });
        let usedTable = [];
        for (let i = 0; i < tableAva.length; i++) {
            if (createReserveDTO.amount <= 0) {
                break;
            }
            let checkSeat = createReserveDTO.amount - tableAva[i].amountOfSeat;
            let countTb = this.arrTableDetail.length === 0 ? `TbDetail-${1}` : `TbDetail-${this.arrTableDetail.length + 1}`;
            let dataInsertTableDetail = {
                tableId: tableAva[i].tableId,
                tableDetailId: countTb,
                reserveId: this.arrReserve[this.arrReserve.length - 1].reserveId,
                seat: checkSeat > 0 ? tableAva[i].amountOfSeat : Math.abs(checkSeat),
                status: '1000',
            };
            this.arrTableDetail.push(dataInsertTableDetail);
            usedTable.push(tableAva[i].tableId);
            createReserveDTO.amount = createReserveDTO.amount - this.arrTable[i].amountOfSeat;
        }
        response.data = { reserveId: dataInsertReserve.reserveId, table: usedTable.join(',') };
        return response;
    }

    async cencelReserveWithId(cancelReserveDTO: CancelReserveDTO) {
        let response: IResponse = {
            status: true,
            statusMessage: 'Success',
            data: null,
        };
        let checkId = this.arrReserve.find((item) => item.reserveId === cancelReserveDTO.reserveId);
        if (!checkId) {
            response.status = false;
            response.statusMessage = 'ReserveId not found';
            throw new NotFoundException(response);
        }
        this.arrTableDetail = this.arrTableDetail.map((item) => {
            let obj = { ...item };
            if (item.reserveId === checkId.reserveId) {
                obj.status = '9000';
            }
            return obj;
        });
        this.arrReserve = this.arrReserve.map((item) => {
            let obj = { ...item };
            if (item.reserveId === cancelReserveDTO.reserveId) {
                obj.status = '9000';
            }
            return obj;
        });
        response.data = 'Cancel is success.';
        return response;
    }

    private async checkTableIsAvliable(client) {
        let findTable = this.arrTable.filter((item) => item.isActive);
        let checkTable = this.arrTableDetail.filter((item) => item.status === '1000');
        let checkAmoutSeatOfShop = findTable.reduce((a, b) => a + b.amountOfSeat, 0);

        if (client > checkAmoutSeatOfShop) {
            return 'Seat full';
        }

        if (client > checkAmoutSeatOfShop - checkTable.length * findTable[0].amountOfSeat) {
            return 'Seat in shop not enough';
        }

        return true;
    }
}
