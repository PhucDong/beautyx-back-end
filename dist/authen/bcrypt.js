"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordAndHash = exports.passwordToHash = void 0;
const bcrypt = require("bcrypt");
function passwordToHash(rawPassword) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt);
}
exports.passwordToHash = passwordToHash;
function comparePasswordAndHash(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePasswordAndHash = comparePasswordAndHash;
//# sourceMappingURL=bcrypt.js.map