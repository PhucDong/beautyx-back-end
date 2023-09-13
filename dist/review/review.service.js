"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AppointmentEntity_1 = require("../TypeOrms/AppointmentEntity");
const CustomerEntity_1 = require("../TypeOrms/CustomerEntity");
const ReviewEntity_1 = require("../TypeOrms/ReviewEntity");
const typeorm_2 = require("typeorm");
let ReviewService = exports.ReviewService = class ReviewService {
    constructor(reviewRepository, customerRepository, appointmentRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
        this.appointmentRepository = appointmentRepository;
    }
    getReviews() {
        return this.reviewRepository.find();
    }
    async getReview(idToFind) {
        const review = await this.reviewRepository.findOneBy({ id: idToFind });
        if (!review)
            throw new common_1.HttpException('reiew with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        return review;
    }
    async createReview(customerId, appointmentId, newReview) {
        const appointmentToUpdate = await this.appointmentRepository.findOne({
            where: { id: appointmentId },
            relations: { review: true },
        });
        if (!appointmentToUpdate)
            throw new common_1.HttpException('appointment cannot be found to add customer review', common_1.HttpStatus.NOT_FOUND);
        const customerToReview = await this.customerRepository.findOne({
            where: { id: customerId },
            relations: { reviews: true },
        });
        if (!customerToReview)
            throw new common_1.HttpException('customer cannot be found to make a review', common_1.HttpStatus.NOT_FOUND);
        const reviewToSave = this.reviewRepository.create(Object.assign({}, newReview));
        const savedReview = await this.reviewRepository.save(reviewToSave);
        customerToReview.reviews.push(savedReview);
        appointmentToUpdate.review = savedReview;
        const updatedAppointment = await this.appointmentRepository.save(appointmentToUpdate);
        const updatedCustomer = await this.customerRepository.save(customerToReview);
        return savedReview;
    }
    updateReview(idToUpdate, updateDetails) {
        return this.reviewRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    deleteReview(idToDelete) {
        return this.reviewRepository.delete(idToDelete);
    }
};
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ReviewEntity_1.ReviewEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(CustomerEntity_1.CustomerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(AppointmentEntity_1.AppointmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map