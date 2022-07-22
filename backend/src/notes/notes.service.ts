import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note) private noteRepository: typeof Note,
    private filesService: FilesService,
  ) {}

  async createNote(dto: CreateNoteDto, media) {
    const fileName = media && (await this.filesService.createFile(media));
    const note = await this.noteRepository.create({
      ...dto,
      media: media && fileName,
    });
    return note;
  }

  async getAllNotes() {
    const note = await this.noteRepository.findAll({ include: { all: true } });
    return note;
  }

  async deleteNoteById(id: number) {
    const count = await this.noteRepository.destroy({ where: { id: id } });
    return count;
  }

  async updateNoteById(id: number, dto: CreateNoteDto, media) {
    const fileName = media && (await this.filesService.createFile(media));
    const note = await this.noteRepository.update(
      { ...dto, media: media && fileName },
      { where: { id: id } },
    );
    return note;
  }

  async canChange(userId: number, dto: CreateNoteDto) {
    if (userId === dto.userId) {
      return true;
    }
    return false;
  }
}
