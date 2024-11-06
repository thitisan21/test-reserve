import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger();
    const app: any = await NestFactory.create(AppModule);
    const port = process.env.PORT ?? 3000;
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder().setTitle('Reserve service').setDescription('The cats API description').setVersion('1.0').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
