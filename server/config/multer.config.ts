import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

export const getPostMulterConfig = () => {
    return {
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, 'public/posts/');
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(null, (req.session.userid || 'userid') + Date.now() + ext);
            },
        }),
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
    };
};

export const getMyPageMulterConfig = () => {
    return {
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, 'public/mypage/');
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(
                    null,
                    (req.session.userid || randomUUID()) + Date.now() + ext
                );
            },
        }),
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
    };
};
