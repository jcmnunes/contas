import { IsDefined } from 'class-validator';

export class CreateFolderDto {
  @IsDefined()
  path: string;
}
