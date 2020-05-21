"use strict";
const app_config_1 = require("./app.config");
const config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: app_config_1.AppConfig.dbUser,
    password: app_config_1.AppConfig.dbPassword,
    database: app_config_1.AppConfig.dbName,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
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