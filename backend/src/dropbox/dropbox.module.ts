import { Module } from '@nestjs/common';
import { DropboxService } from './dropbox.service';
import { DropboxController } from './dropbox.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DropboxService, ConfigService],
  controllers: [DropboxController],
})
export class DropboxModule {}
