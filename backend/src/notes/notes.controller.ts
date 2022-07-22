import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthorGuard } from '../auth/author.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Note } from './notes.model';

@ApiTags('Посты')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: Note })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('media'))
  create(@Body() dto: CreateNoteDto, @UploadedFile() media) {
    console.log(dto);
    return this.notesService.createNote(dto, media);
  }

  @ApiOperation({ summary: 'Изменение поста' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthorGuard)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('media'))
  updateNoteById(
    @Param('id') id: number,
    @Body() dto: CreateNoteDto,
    @UploadedFile() media,
  ) {
    return this.notesService.updateNoteById(id, dto, media);
  }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthorGuard)
  @Delete('/:id')
  deleteNoteById(@Param('id') id: number) {
    return this.notesService.deleteNoteById(id);
  }

  @ApiOperation({ summary: 'Возвращает все посты' })
  @ApiResponse({ status: 200, type: [Note] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }
}
