import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from '../notes/notes.model';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Note) private noteRepository: typeof Note,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const noteId = req.params.id;
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const user = this.jwtService.verify(token);
      const note = this.noteRepository.findOne({ where: { id: noteId } });
      return note.then((res) => {
        if (user.id !== res.userId) {
          return false;
        }
        req.user = user;
        return true;
      });
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
