/// <reference types="multer" />
export declare const multerConfig: {
    dest: string;
};
export declare const salonMulterOptions: {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
export declare const customerMulterOptions: {
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
