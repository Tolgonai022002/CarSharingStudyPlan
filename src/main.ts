import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule ,DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Car rent implementation')
      .setDescription('The car rent info')
      .setVersion('1.0')
      .addTag('car rent')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT;
  await app.listen(PORT || 3000, () => {
    Logger.log(`Server started on PORT ${PORT}`);
  });
}
bootstrap();
