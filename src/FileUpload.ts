import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
    dest: './pics',
};

// Multer upload options
export const salonMulterOptions = {
    // Enable file size limits
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;
            //console.log("the upload destination is: " + uploadPath)
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        // File modification details
        // filename: (req: any, file: any, cb: any) => {
        //     // Calling the callback passing the random name generated with the original extension name
        //     cb(null, `${uuid()}${extname(file.originalname)}`);
        // },
        filename: (req, file, callback) => {
            //console.log("in filename option, image type: " + req.params.imageType)
            const name = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            const newFileName = req.params.imageType + '_' + name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;

            callback(null, newFileName);
        },
    }),
};
export const customerMulterOptions = {
    // Enable file size limits
    // limits: {
    //     fileSize: +process.env.MAX_FILE_SIZE,
    // },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;
            //console.log("the upload destination is: " + uploadPath)
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        // File modification details
        // filename: (req: any, file: any, cb: any) => {
        //     // Calling the callback passing the random name generated with the original extension name
        //     cb(null, `${uuid()}${extname(file.originalname)}`);
        // },
        filename: (req, file, callback) => {
            //console.log("in filename option, image type: " + req.params.imageType)
            const name = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            const newFileName = 'customer' + '_' + name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;

            callback(null, newFileName);
        },
    }),
};