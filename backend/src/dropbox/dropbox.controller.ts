import { Controller, Get, Post, Body, Query, ValidationPipe } from '@nestjs/common';
import { DropboxService } from './dropbox.service';
import { ListFolderDto } from './dto/list-folder.dto';
import { CreateFolderDto } from './dto/create-folder.dto';

@Controller('dropbox')
export class DropboxController {
  constructor(
    private readonly dropboxService: DropboxService,
  ) {}

  @Get()
  async listFolder(@Query(ValidationPipe) listFolderDto: ListFolderDto) {
    const { path } = listFolderDto;
    return this.dropboxService.listFolder(path);
  }

  @Post()
  createFolder(@Body(ValidationPipe) createFolderDto: CreateFolderDto) {
    const { path } = createFolderDto;
    return this.dropboxService.createFolder(path);
  }
}
