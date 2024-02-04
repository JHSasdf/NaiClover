import 'dotenv/config';
import { Options } from 'sequelize';

export function getDBConfig(): Options {
    return {
        username: process.env.MYSQLUSERNAME!,
        password: process.env.MYSQLUSERPASSWORD!,
        database: process.env.DATABASENAME!,
        host: process.env.SERVERIPNO!,
        dialect: 'mysql',
        timezone: '+09:00',
    };
}
