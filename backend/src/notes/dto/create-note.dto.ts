import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Первый пост', description: 'Заголовок поста' })
  readonly title;
  @ApiProperty({ example: 'Привет, это мой первый пост', description: 'Текст поста' })
  readonly text;
  @ApiProperty({ example: 'verblud.jpeg', description: 'Картинка или видео' })
  readonly media;
  @ApiProperty({ example: '1', description: 'Id пользователя, написавшего пост' })
  readonly userId;
}