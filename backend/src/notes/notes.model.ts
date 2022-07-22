import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { ApiProperty } from '@nestjs/swagger';

interface NoteCreationAttrs {
  title: string;
  text: string;
  media: string;
  userId: number;
}

@Table({ tableName: 'notes' })
export class Note extends Model<Note, NoteCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Id поста' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Первый пост', description: 'Заголовок поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Привет, это мой первый пост',
    description: 'Текст поста',
  })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({ example: 'verblud.jpeg', description: 'Картинка или видео' })
  @Column({ type: DataType.STRING })
  media: string;

  @ApiProperty({
    example: '1',
    description: 'Id пользователя, написавшего пост',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
