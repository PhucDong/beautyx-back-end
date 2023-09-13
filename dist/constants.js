"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalStatusEnum = exports.GenderEnum = exports.SalonTypeEnum = exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Customer"] = "customer";
    RoleEnum["Employee"] = "employee";
    RoleEnum["Manager"] = "manager";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var SalonTypeEnum;
(function (SalonTypeEnum) {
    SalonTypeEnum["Spa"] = "spa";
    SalonTypeEnum["Barber"] = "barber";
    SalonTypeEnum["HairStyling"] = "hair styling";
    SalonTypeEnum["Manicure"] = "manicure";
    SalonTypeEnum["Pedicure"] = "pedicure";
})(SalonTypeEnum || (exports.SalonTypeEnum = SalonTypeEnum = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
    GenderEnum["OTHERS"] = "others";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var ApprovalStatusEnum;
(function (ApprovalStatusEnum) {
    ApprovalStatusEnum["APPROVED"] = "approved";
    ApprovalStatusEnum["DENIED"] = "denied";
    ApprovalStatusEnum["PENDING"] = "pending";
    ApprovalStatusEnum["COMPLETED"] = "completed";
    ApprovalStatusEnum["CANCELLED"] = "cancelled";
})(ApprovalStatusEnum || (exports.ApprovalStatusEnum = ApprovalStatusEnum = {}));
//# sourceMappingURL=constants.js.map