import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/notes.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env['PG_HOST'],
      port: Number(process.env['PG_PORT']),
      username: process.env['PG_USER'],
      password: process.env['PG_PASSWORD'],
      database: process.env['PG_DB'],
      models: [User, Note],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    NotesModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
