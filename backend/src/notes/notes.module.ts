import { forwardRef, Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Note } from './notes.model';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Note, User]),
    FilesModule,
  ],
})
export class NotesModule {}
