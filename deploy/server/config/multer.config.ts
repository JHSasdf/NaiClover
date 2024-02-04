const multer = require('multer');
const path = require('path');

export const getPostMulterConfig = () => {
    return {
        storage: multer.diskStorage({
            destination(req: any, file: any, done: any) {
                done(null, 'public/posts/');
            },
            filename(req: any, file: any, done: any) {
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
            destination(req: any, file: any, done: any) {
                done(null, 'public/mypage/');
            },
            filename(req: any, file: any, done: any) {
                const ext = path.extname(file.originalname);
                done(null, (req.session.userid || 'userid') + Date.now() + ext);
            },
        }),
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
    };
};
