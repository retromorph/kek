import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotesModule } from '../notes/notes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Note } from '../notes/notes.model';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => NotesModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret-key',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    SequelizeModule.forFeature([Note]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
