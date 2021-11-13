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
const common_1 = require("@nestjs/common");
const dropbox_service_1 = require("./dropbox.service");
const list_folder_dto_1 = require("./dto/list-folder.dto");
const create_folder_dto_1 = require("./dto/create-folder.dto");
let DropboxController = class DropboxController {
    constructor(dropboxService) {
        this.dropboxService = dropboxService;
    }
    async listFolder(listFolderDto) {
        const { path } = listFolderDto;
        return this.dropboxService.listFolder(path);
    }
    createFolder(createFolderDto) {
        const { path } = createFolderDto;
        return this.dropboxService.createFolder(path);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_folder_dto_1.ListFolderDto]),
    __metadata("design:returntype", Promise)
], DropboxController.prototype, "listFolder", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_folder_dto_1.CreateFolderDto]),
    __metadata("design:returntype", void 0)
], DropboxController.prototype, "createFolder", null);
DropboxController = __decorate([
    common_1.Controller('dropbox'),
    __metadata("design:paramtypes", [dropbox_service_1.DropboxService])
], DropboxController);
exports.DropboxController = DropboxController;
//# sourceMappingURL=dropbox.controller.js.map