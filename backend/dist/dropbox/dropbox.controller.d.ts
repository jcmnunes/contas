import { DropboxService } from './dropbox.service';
import { ListFolderDto } from './dto/list-folder.dto';
import { CreateFolderDto } from './dto/create-folder.dto';
export declare class DropboxController {
    private readonly dropboxService;
    constructor(dropboxService: DropboxService);
    listFolder(listFolderDto: ListFolderDto): Promise<DropboxTypes.files.ListFolderResult>;
    createFolder(createFolderDto: CreateFolderDto): Promise<DropboxTypes.files.CreateFolderResult>;
}
