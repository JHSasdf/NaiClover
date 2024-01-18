import { Sequelize } from 'sequelize';

const config = require(__dirname + '/../config/config.json')['development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
import { UserModel } from './User';
const User = UserModel(sequelize, Sequelize);


export const db = { User, sequelize, Sequelize };

db.Sequelize = Sequelize;
db.sequelize = sequelize;

