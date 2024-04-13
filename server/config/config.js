"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConfig = void 0;
require("dotenv/config");
function getDBConfig() {
    return {
        username: process.env.MYSQLUSERNAME,
        password: process.env.MYSQLUSERPASSWORD,
        database: process.env.DATABASENAME,
        host: process.env.SERVERIPNO,
        dialect: 'mysql',
        timezone: '+09:00',
    };
}
exports.getDBConfig = getDBConfig;
