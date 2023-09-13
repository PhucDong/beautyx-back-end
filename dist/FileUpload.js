"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerMulterOptions = exports.salonMulterOptions = exports.multerConfig = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
exports.multerConfig = {
    dest: './pics',
};
exports.salonMulterOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = exports.multerConfig.dest;
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            const newFileName = req.params.imageType + '_' + name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;
            callback(null, newFileName);
        },
    }),
};
exports.customerMulterOptions = {
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadPath = exports.multerConfig.dest;
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            const newFileName = 'customer' + '_' + name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;
            callback(null, newFileName);
        },
    }),
};
//# sourceMappingURL=FileUpload.js.map