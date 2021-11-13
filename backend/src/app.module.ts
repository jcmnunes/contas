import { Module } from '@nestjs/common';
import { DropboxModule } from './dropbox/dropbox.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DropboxModule, ConfigModule.forRoot()],
})
export class AppModule {}
