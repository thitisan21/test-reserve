import { Test } from '@nestjs/testing';
import { ReserveModule } from './reserve.module';

describe('SnowFlakeModule', () => {
    let reserveModule: ReserveModule;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ReserveModule],
        }).compile();

        reserveModule = moduleRef.get<ReserveModule>(ReserveModule);
    });

    it('should be defined', () => {
        expect(reserveModule).toBeDefined();
    });
});
