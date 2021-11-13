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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dropbox_1 = require("dropbox");
const isomorphic_fetch_1 = require("isomorphic-fetch");
const config_1 = require("@nestjs/config");
const dropbox_enums_1 = require("./dropbox-enums");
let DropboxService = class DropboxService {
    constructor(configService) {
        this.configService = configService;
        this.dbx = new dropbox_1.Dropbox({
            accessToken: configService.get('DBX_ACCESS_TOKEN'),
            fetch: isomorphic_fetch_1.default,
        });
    }
    async listFolder(path) {
        try {
            return await this.dbx.filesListFolder({ path: path });
        }
        catch (error) {
            if (error.status === 409) {
                const specificError = error.error
                    .error;
                if (specificError['.tag'] === 'path') {
                    const lookupError = specificError.path['.tag'];
                    if (lookupError === dropbox_enums_1.LookupError.NotFound) {
                        throw new common_1.NotFoundException('Folder not found');
                    }
                    if (lookupError === dropbox_enums_1.LookupError.NotFolder) {
                        throw new common_1.BadRequestException('Current path is not a folder');
                    }
                }
            }
            throw new common_1.BadRequestException('Bad request');
        }
    }
    async createFolder(path) {
        try {
            return await this.dbx.filesCreateFolderV2({ path });
        }
        catch (error) {
            if (error.status === 409) {
                const specificError = error.error
                    .error;
                if (specificError['.tag'] === 'path') {
                    const writeError = specificError.path;
                    if (writeError['.tag'] === dropbox_enums_1.WriteError.Conflict) {
                        if (writeError.conflict['.tag'] === dropbox_enums_1.ConflictError.Folder) {
                            throw new common_1.ConflictException('Folder already exists');
                        }
                    }
                }
            }
            throw new common_1.BadRequestException('Bad request');
        }
    }
};
DropboxService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DropboxService);
exports.DropboxService = DropboxService;
//# sourceMappingURL=dropbox.service.js.map