import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта пользователя' })
  readonly nickname: string;
  @ApiProperty({ example: 'qwerty', description: 'Пароль пользователя' })
  readonly password: string;
}