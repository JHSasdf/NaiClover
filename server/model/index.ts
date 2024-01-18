import { Sequelize } from 'sequelize';

const config = require(__dirname + '/../config/config.json')['development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const User = require('./User')(sequelize, Sequelize);

export const db = { User, sequelize, Sequelize };

db.sequelize = sequelize;
db.Sequelize = Sequelize;
