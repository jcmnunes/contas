import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import { ConfigService } from '@nestjs/config';
import { ConflictError, LookupError, WriteError } from './dropbox-enums';

@Injectable()
export class DropboxService {
  private dbx: Dropbox;

  constructor(private readonly configService: ConfigService) {
    this.dbx = new Dropbox({
      accessToken: configService.get<string>('DBX_ACCESS_TOKEN'),
      fetch,
    });
  }

  async listFolder(path: string) {
    try {
      return await this.dbx.filesListFolder({ path: path });
    } catch (error) {
      // Endpoint specific error
      if (error.status === 409) {
        const specificError = error.error
          .error as DropboxTypes.files.ListFolderError;

        if (specificError['.tag'] === 'path') {
          const lookupError = specificError.path['.tag'];

          if (lookupError === LookupError.NotFound) {
            throw new NotFoundException('Folder not found');
          }

          if (lookupError === LookupError.NotFolder) {
            throw new BadRequestException('Current path is not a folder');
          }
        }
      }

      throw new BadRequestException('Bad request');
    }
  }

  async createFolder(path: string) {
    try {
      return await this.dbx.filesCreateFolderV2({ path });
    } catch (error) {
      // Endpoint specific error
      if (error.status === 409) {
        const specificError = error.error
          .error as DropboxTypes.files.CreateFolderError;

        if (specificError['.tag'] === 'path') {
          const writeError = specificError.path;

          if (writeError['.tag'] === WriteError.Conflict) {
            if (writeError.conflict['.tag'] === ConflictError.Folder) {
              throw new ConflictException('Folder already exists');
            }
          }
        }
      }

      throw new BadRequestException('Bad request');
    }
  }
}
