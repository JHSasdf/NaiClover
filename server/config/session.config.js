"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionConfig = void 0;
var session = require("express-session");
var MySQLStore = require('express-mysql-session');
require("dotenv/config");
var MySQLStoreSession = MySQLStore(session);
var options = {
    host: process.env.SERVERIPNO,
    port: parseInt(process.env.MYSQLPORT, 10),
    user: process.env.MYSQLUSERNAME,
    password: process.env.MYSQLUSERPASSWORD,
    database: process.env.DATABASENAME,
};
var sessionStore = new MySQLStoreSession(options);
function getSessionConfig() {
    return {
        secret: process.env.SECRETKEY,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            maxAge: 14 * 24 * 60 * 60 * 1000,
        },
    };
}
exports.getSessionConfig = getSessionConfig;
