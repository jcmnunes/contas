import { IsDefined } from 'class-validator';

export class ListFolderDto {
  @IsDefined()
  path: string;
}
