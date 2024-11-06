import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReserveController } from './reserve/reserve.controller';
import { ReserveModule } from './reserve/reserve.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env`],
            isGlobal: true,
        }),
        ReserveModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
