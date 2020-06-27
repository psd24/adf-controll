"use strict";
const app_config_template_1 = require("./app.config.template");
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: app_config_template_1.AppConfig.dbUser,
    password: app_config_template_1.AppConfig.dbPassword,
    database: app_config_template_1.AppConfig.dbName,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migration/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migration',
    },
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map