import { ConfigService } from '@nestjs/config';
export declare class DropboxService {
    private readonly configService;
    private dbx;
    constructor(configService: ConfigService);
    listFolder(path: string): Promise<DropboxTypes.files.ListFolderResult>;
    createFolder(path: string): Promise<DropboxTypes.files.CreateFolderResult>;
}
