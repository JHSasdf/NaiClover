import { db } from '../../model';
import sequelize from 'sequelize';
import { Op } from 'sequelize';

export const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};
