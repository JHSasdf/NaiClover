import * as session from 'express-session';
import MySQLStore from 'express-mysql-session';
const MySQLStoreSession = MySQLStore(session);

const options = {
    host: '3.36.62.47',
    port: 3306,
    user: 'user',
    password: 'hypeboy',
    database: 'nai-clover',
};

const sessionStore = new MySQLStoreSession(options);

export function getSessionConfig() {
    return {
        secret: 'mySessionSecret',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
        },
    };
}
