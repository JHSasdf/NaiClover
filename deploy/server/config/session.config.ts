import * as session from 'express-session';
import { Options } from 'express-mysql-session';
const MySQLStore = require('express-mysql-session');
import 'dotenv/config';

const MySQLStoreSession = MySQLStore(session);

const options: Options = {
    host: process.env.SERVERIPNO!,
    port: parseInt(process.env.MYSQLPORT!, 10),
    user: process.env.MYSQLUSERNAME!,
    password: process.env.MYSQLUSERPASSWORD,
    database: process.env.DATABASENAME,
};

const sessionStore = new MySQLStoreSession(options);

export function getSessionConfig() {
    return {
        secret: process.env.SECRETKEY!,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            maxAge: 14 * 24 * 60 * 60 * 1000,
        },
    };
}
