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
exports.SalonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ReviewEntity_1 = require("../TypeOrms/ReviewEntity");
const SalonEntity_1 = require("../TypeOrms/SalonEntity");
const typeorm_2 = require("typeorm");
const fs = require("fs");
let SalonService = exports.SalonService = class SalonService {
    constructor(salonRepository, reviewRepository) {
        this.salonRepository = salonRepository;
        this.reviewRepository = reviewRepository;
    }
    async getSalons(pageSize, pageNumber, sortOption) {
        const salons = await this.salonRepository.find({ relations: ['appointments'] });
        const salonToReturn = await this.formatAndSortSalons(salons, sortOption);
        return salonToReturn;
    }
    async getSalonsPage(page, pageSize, keyword) {
        const [list, count] = await this.salonRepository.findAndCount({
            relations: ['serviceCategories'],
            where: [
                { salonName: (0, typeorm_2.Like)(`%${keyword}%`) },
                { salonAddress: (0, typeorm_2.Like)(`%${keyword}%`) },
                { serviceCategories: { serviceCategoryName: (0, typeorm_2.Like)(`%${keyword}%`) } }
            ],
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return { list, count, page, pageSize };
    }
    async getSalonsFiltered(pageSize, pageNumber, salonType, sortOption) {
        const filterArray = salonType.split('-');
        let filteredSalon = [];
        const salons = await this.salonRepository.find({ relations: ['appointments'] });
        for (var i = 0; i < salons.length; i++) {
            const salonTypesArray = salons[i].salonTypes.split(',');
            if (filterArray.some((type) => salonTypesArray.includes(type))) {
                console.log("found salon type in salonTypes");
                filteredSalon.push(salons[i]);
            }
        }
        const salonToReturn = await this.formatAndSortSalons(filteredSalon, sortOption);
        const salonPage = await this.customPagination(salonToReturn, salonToReturn.length, pageSize, pageNumber);
        return salonPage;
    }
    async searchSalonQuery(searchKey, pageSize, pageNumber) {
        const salons = await this.salonRepository.find({ relations: ['serviceCategories', 'appointments'] });
        const sortedSalons = await this.formatAndSortSalons(salons);
        if (searchKey.length == 0)
            throw new common_1.HttpException('the search keyword cannot be empty', common_1.HttpStatus.BAD_REQUEST);
        searchKey = searchKey.toLowerCase();
        const searchKeyList = searchKey.split(' ');
        console.log("list of keys to find in query");
        console.log(searchKeyList);
        var foundList = [];
        console.log('length of sorted salon: ' + sortedSalons.length);
        for (var i = 0; i < sortedSalons.length; i++) {
            console.log('search salon loop: ' + i);
            const salonToSearch = sortedSalons[i];
            var searchkeyFound = 0;
            var totalSearchScore = 0;
            for (var k = 0; k < searchKeyList.length; k++) {
                console.log('search key loop number: ' + k);
                const searchKey = searchKeyList[k];
                let startIndex = 0, index, salonNameIndices = [], salonAddressIndices = [], salonServiceCategoryIndices = [];
                while ((index = salonToSearch.salonName.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonNameIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                startIndex = 0;
                while ((index = salonToSearch.salonAddress.toLowerCase().indexOf(searchKey, startIndex)) > -1) {
                    salonAddressIndices.push(index);
                    startIndex = index + searchKey.length;
                }
                let categoryScore = 0;
                console.log("service categories: " + salonToSearch.serviceCategories);
                for (var j = 0; j < salonToSearch.serviceCategories.length; j++) {
                    console.log("serivce categories search loop: " + j);
                    const categoryToSearch = salonToSearch.serviceCategories[j];
                    var categoryStartIndex = 0, categoryIndices = [];
                    while ((index = categoryToSearch.serviceCategoryName.toLowerCase().indexOf(searchKey, categoryStartIndex)) > -1) {
                        categoryIndices.push(index);
                        categoryStartIndex = index + searchKey.length;
                    }
                    salonServiceCategoryIndices.push(categoryIndices);
                    categoryScore += categoryIndices.length;
                }
                console.log('category score: ' + categoryScore);
                console.log("salon service category indices length: " + salonServiceCategoryIndices.length);
                const resultScore = salonNameIndices.length + salonAddressIndices.length + categoryScore;
                if (resultScore != 0) {
                    searchkeyFound++;
                    totalSearchScore += resultScore;
                }
            }
            console.log("number of search key found: " + searchkeyFound);
            console.log("total search score: " + totalSearchScore);
            if (searchkeyFound != 0) {
                const salonFound = Object.assign(Object.assign({}, salonToSearch), { totalSearchScore });
                foundList.push(salonFound);
            }
        }
        foundList.sort((a, b) => a.totalSearchScore + b.totalSearchScore);
        const foundListSorted = this.quickSortSearchScore(foundList);
        const pageToReturn = this.customPagination(foundListSorted, foundListSorted.length, pageSize, pageNumber);
        return pageToReturn;
    }
    async getSalon(idToFind) {
        const salon = await this.salonRepository.findOne({ relations: ['appointments', 'manager'], where: { id: idToFind } });
        if (!salon)
            throw new common_1.HttpException('the salon with the given id cannot be found', common_1.HttpStatus.NOT_FOUND);
        const salonToReturn = this.formatSalonForDisplay(salon);
        return salonToReturn;
    }
    getSalonServiceCategories(idToFind) {
        return this.salonRepository.findOne({ relations: ['serviceCategories'], where: { id: idToFind } });
    }
    getSalonAppointments(idToFind) {
        return this.salonRepository.findOne({ relations: ['appointments'], where: { id: idToFind } });
    }
    getSalonInventories(idToFind) {
        return this.salonRepository.findOne({ relations: ['inventories'], where: { id: idToFind } });
    }
    getSalonEmployess(idToFind) {
        return this.salonRepository.findOne({ relations: ['employees'], where: { id: idToFind } });
    }
    createSalon(newSalon) {
        var workDays = '';
        for (var i = 0; i < newSalon.workDays.length; i++) {
            const currentWorkDay = newSalon.workDays[i];
            workDays += currentWorkDay.workDay + '-' + currentWorkDay.startTime + '-' + currentWorkDay.endTime + ',';
        }
        if (workDays.charAt(workDays.length - 1) == ',') {
            workDays = workDays.substring(0, workDays.length - 1);
        }
        var salonTypes = '';
        for (var i = 0; i < newSalon.salonTypes.length; i++) {
            const currentType = newSalon.salonTypes[i];
            salonTypes += currentType + ',';
        }
        if (salonTypes.charAt(salonTypes.length - 1) == ',') {
            salonTypes = salonTypes.substring(0, salonTypes.length - 1);
        }
        const salonToSave = this.salonRepository.create(Object.assign(Object.assign({}, newSalon), { workDays, salonTypes }));
        return this.salonRepository.save(salonToSave);
    }
    updateSalon(idToUpdate, updateDetails) {
        return this.salonRepository.update(idToUpdate, Object.assign({}, updateDetails));
    }
    async updateSalonHighLights(idToUpdate, updateDetails) {
        const salonToUpdate = await this.salonRepository.findOne({ where: { id: idToUpdate } });
        if (!salonToUpdate)
            throw new common_1.HttpException('the salon with the given id cannot be found to update it\'s highlights', common_1.HttpStatus.NOT_FOUND);
        for (var i = 0; i < updateDetails.highLights.length; i++) {
            const currentHighLight = updateDetails.highLights[i];
            const indexToFind = salonToUpdate.highLights.indexOf(currentHighLight);
            if (indexToFind == -1) {
                if (salonToUpdate.highLights == '') {
                    salonToUpdate.highLights = currentHighLight;
                }
                else {
                    salonToUpdate.highLights = salonToUpdate.highLights + ',' + currentHighLight;
                }
            }
            else {
                const leftString = salonToUpdate.highLights.substring(0, indexToFind);
                const rightString = salonToUpdate.highLights.substring(indexToFind + currentHighLight.length + 1);
                salonToUpdate.highLights = leftString + rightString;
                if (salonToUpdate.highLights.charAt(salonToUpdate.highLights.length - 1) == ',') {
                    salonToUpdate.highLights = salonToUpdate.highLights.substring(0, salonToUpdate.highLights.length - 1);
                }
            }
        }
        return this.salonRepository.save(salonToUpdate);
    }
    async updateSalonTypes(idToUpdate, updateDetails) {
        const salonToUpdate = await this.salonRepository.findOne({ where: { id: idToUpdate } });
        if (!salonToUpdate)
            throw new common_1.HttpException('the salon with the given id cannot be found to update it\'s salon type', common_1.HttpStatus.NOT_FOUND);
        for (var i = 0; i < updateDetails.salonTypes.length; i++) {
            const currentType = updateDetails.salonTypes[i];
            const indexToFind = salonToUpdate.salonTypes.indexOf(currentType);
            if (indexToFind == -1) {
                if (salonToUpdate.salonTypes == '') {
                    salonToUpdate.salonTypes = currentType;
                }
                else {
                    salonToUpdate.salonTypes = salonToUpdate.salonTypes + ',' + currentType;
                }
            }
            else {
                const leftString = salonToUpdate.salonTypes.substring(0, indexToFind);
                const rightString = salonToUpdate.salonTypes.substring(indexToFind + currentType.length + 1);
                salonToUpdate.salonTypes = leftString + rightString;
                if (salonToUpdate.salonTypes.charAt(salonToUpdate.salonTypes.length - 1) == ',') {
                    salonToUpdate.salonTypes = salonToUpdate.salonTypes.substring(0, salonToUpdate.salonTypes.length - 1);
                }
            }
        }
        return this.salonRepository.save(salonToUpdate);
    }
    async updateSalonWorkDay(idToUpdate, updateDetails) {
        const salonToUpdate = await this.salonRepository.findOne({ where: { id: idToUpdate } });
        if (!salonToUpdate)
            throw new common_1.HttpException('the salon with the given id cannot be found to update it\'s workday', common_1.HttpStatus.NOT_FOUND);
        salonToUpdate.workDays = this.updateWorkDay(salonToUpdate.workDays, updateDetails);
        return this.salonRepository.save(salonToUpdate);
    }
    async updateSalonWorkDayList(idToUpdate, updateDetails) {
        const salonToUpdate = await this.salonRepository.findOne({ where: { id: idToUpdate } });
        if (!salonToUpdate)
            throw new common_1.HttpException('the salon with the given id cannot be found to update it\'s workday', common_1.HttpStatus.NOT_FOUND);
        for (var i = 0; i < updateDetails.workDayList.length; i++) {
            const currentWorkDay = updateDetails.workDayList[i];
            salonToUpdate.workDays = this.updateWorkDay(salonToUpdate.workDays, currentWorkDay);
        }
        return this.salonRepository.save(salonToUpdate);
    }
    deleteSalon(idToDelete) {
        return this.salonRepository.delete(idToDelete);
    }
    async updateSalonPhoto(idToUpdate, file) {
        console.log("file name in the update salon photo service: " + file.filename);
        const salonToUpdate = await this.salonRepository.findOne({ where: { id: idToUpdate } });
        if (!salonToUpdate)
            throw new common_1.HttpException('the salon with the given id cannot be found to update it\'s photos', common_1.HttpStatus.NOT_FOUND);
        const photoName = file.filename;
        const photoNameParts = photoName.split('_');
        let photoArray = [];
        if (salonToUpdate.salonPhotos != null) {
            photoArray = salonToUpdate.salonPhotos.split(',');
        }
        console.log('salon photo string: ' + salonToUpdate.salonPhotos);
        console.log('the length of the photo array: ' + photoArray.length);
        console.log('photo array: ' + photoArray);
        if (salonToUpdate.salonPhotos == null) {
            console.log("photo string is null");
            salonToUpdate.salonPhotos = photoName;
            return this.salonRepository.save(salonToUpdate);
        }
        for (var i = 0; i < photoArray.length; i++) {
            const currentPhoto = photoArray[i];
            console.log("current photo name: " + currentPhoto);
            const indexToFind = currentPhoto.indexOf(photoNameParts[0]);
            if (indexToFind == -1) {
                if (i != photoArray.length - 1) {
                    continue;
                }
                else {
                    salonToUpdate.salonPhotos = salonToUpdate.salonPhotos + ',' + photoName;
                    return this.salonRepository.save(salonToUpdate);
                }
            }
            else {
                photoArray.splice(i, 1, photoName);
                const oldPath = './pics/' + currentPhoto;
                console.log('photo old path: ' + oldPath);
                let newPhotoStr = '';
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
                for (var j = 0; j < photoArray.length; j++) {
                    newPhotoStr += photoArray[j] + ',';
                }
                if (newPhotoStr.charAt(newPhotoStr.length - 1) == ',') {
                    newPhotoStr = newPhotoStr.substring(0, newPhotoStr.length - 1);
                }
                salonToUpdate.salonPhotos = newPhotoStr;
                console.log("new photo string: " + newPhotoStr);
                return this.salonRepository.save(salonToUpdate);
            }
        }
    }
    workDayStringToArray(workDayStr) {
        const workDaysList = workDayStr.split(',');
        var workDaysListToReturn = [];
        for (var i = 0; i < workDaysList.length; i++) {
            var [dayStr, startTimeStr, endTimeStr] = workDaysList[i].split('-');
            workDaysListToReturn.push({
                workDay: dayStr,
                startTime: startTimeStr,
                endTime: endTimeStr
            });
        }
        return workDaysListToReturn;
    }
    async formatSalonForDisplay(salon) {
        console.log("current salon: " + salon.salonName);
        let appointmentIdList = [];
        for (var i = 0; i < salon.appointments.length; i++) {
            appointmentIdList.push(salon.appointments[i].id);
        }
        const reviews = await this.reviewRepository.find({ relations: ['appointment', 'customer'], where: { appointment: { id: (0, typeorm_2.In)(appointmentIdList) } } });
        var reviewsToReturn = [];
        let sum = 0;
        for (var j = 0; j < reviews.length; j++) {
            const reviewFormated = {
                rating: reviews[j].rating,
                comment: reviews[j].comment,
                customer: reviews[j].customer
            };
            sum += reviews[j].rating;
            reviewsToReturn.push(reviewFormated);
        }
        let averageRating;
        if (sum == 0) {
            averageRating = 0;
        }
        else {
            averageRating = sum / reviews.length;
        }
        let highlightsToReturn = null, salonTypesToReturn = null, salonPhotoToReturn = null;
        if (salon.highLights != null) {
            console.log("salon high lights is not null so split");
            highlightsToReturn = salon.highLights.split(',');
        }
        if (salon.salonTypes != null) {
            console.log("salon types is not null so split");
            salonTypesToReturn = salon.salonTypes.split(',');
        }
        if (salon.salonPhotos != null) {
            console.log("salon photo is not null so split");
            salonPhotoToReturn = salon.salonPhotos.split(',');
        }
        else {
            console.log("salon photo is null so no split");
        }
        console.log("done spliting");
        const workDaysListToReturn = this.workDayStringToArray(salon.workDays);
        const salonFormatted = Object.assign(Object.assign({}, salon), { highLights: highlightsToReturn, salonTypes: salonTypesToReturn, workDays: workDaysListToReturn, reviews: reviewsToReturn, reviewsNumber: reviewsToReturn.length, salonRating: averageRating });
        return salonFormatted;
    }
    customPagination(salons, salonLength, pageSize, pageNumber) {
        var salonPage = [];
        for (var pageStartIndex = (pageNumber - 1) * pageSize; pageStartIndex < pageSize * pageNumber; pageStartIndex++) {
            salonPage.push(salons[pageStartIndex]);
        }
        let totalPageNumber = salons.length / pageSize;
        if (salons.length % pageSize != 0) {
            totalPageNumber++;
        }
        console.log("list length: " + salons.length);
        console.log("salon length: " + salonLength);
        console.log("total page number: " + totalPageNumber);
        console.log("math floor: " + Math.floor(totalPageNumber));
        return {
            salonPage,
            totalPageNumber: Math.floor(totalPageNumber)
        };
    }
    async formatAndSortSalons(salons, sortOption) {
        var formattedSalons = [];
        for (var i = 0; i < salons.length; i++) {
            let salonToReturn = await this.formatSalonForDisplay(salons[i]);
            formattedSalons.push(salonToReturn);
        }
        let sortedSalons = [];
        if (sortOption == 'alphabetical') {
            sortedSalons = this.quickSortSalonName(formattedSalons);
        }
        else if (sortOption == 'rating') {
            sortedSalons = this.quickSortSalonRating(formattedSalons);
        }
        else {
            sortedSalons = this.quickSortSalonRating(formattedSalons);
        }
        if (!sortOption) {
            return sortedSalons;
        }
        else {
            return sortedSalons;
        }
    }
    updateWorkDay(salonWorkDay, workDayToUpdate) {
        const workDayStr = workDayToUpdate.workDay + '-' + workDayToUpdate.startTime + '-' + workDayToUpdate.endTime;
        const indexToFind = salonWorkDay.indexOf(workDayToUpdate.workDay);
        if (indexToFind == -1) {
            if (salonWorkDay == '') {
                salonWorkDay = workDayStr;
            }
            else {
                salonWorkDay = salonWorkDay + ',' + workDayStr;
            }
        }
        else {
            const leftString = salonWorkDay.substring(0, indexToFind);
            const rightString = salonWorkDay.substring(indexToFind + workDayStr.length + 1);
            salonWorkDay = leftString + rightString;
            if (salonWorkDay.charAt(salonWorkDay.length - 1) == ',') {
                salonWorkDay = salonWorkDay.substring(0, salonWorkDay.length - 1);
            }
        }
        return salonWorkDay;
    }
    quickSortSalonRating(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].salonRating > pivot.salonRating) {
                leftArr.push(arr[i]);
            }
            else {
                rightArr.push(arr[i]);
            }
        }
        return [...this.quickSortSalonRating(leftArr), pivot, ...this.quickSortSalonRating(rightArr)];
    }
    quickSortSalonName(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].salonName > pivot.salonName) {
                leftArr.push(arr[i]);
            }
            else {
                rightArr.push(arr[i]);
            }
        }
        return [...this.quickSortSalonName(leftArr), pivot, ...this.quickSortSalonName(rightArr)];
    }
    quickSortSearchScore(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].totalSearchScore > pivot.totalSearchScore) {
                leftArr.push(arr[i]);
            }
            else {
                rightArr.push(arr[i]);
            }
        }
        return [...this.quickSortSearchScore(leftArr), pivot, ...this.quickSortSearchScore(rightArr)];
    }
    ;
};
exports.SalonService = SalonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(SalonEntity_1.SalonEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ReviewEntity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SalonService);
//# sourceMappingURL=salon.service.js.map