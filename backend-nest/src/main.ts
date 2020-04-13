import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Api document')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
    const optionsCors = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "credentials":true
    }
    //app.use(cors(options))
    app.enableCors(optionsCors)

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  const seedService = app.get(SeedService);
  await seedService.start();

  await app.listen(3000);
}
bootstrap();
