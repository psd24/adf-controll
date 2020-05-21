"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const seed_service_1 = require("./seed/seed.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const options = new swagger_1.DocumentBuilder()
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
        "credentials": true
    };
    app.enableCors(optionsCors);
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
    const seedService = app.get(seed_service_1.SeedService);
    await seedService.start();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map