import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse, User as SharedUser } from '@easytrip/shared';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(email: string, password: string): Promise<AuthResponse> {
    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email já cadastrado');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create(email, passwordHash);
    return this.buildResponse(user);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.buildResponse(user);
  }

  async me(userId: string): Promise<SharedUser> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return this.toPublic(user);
  }

  private buildResponse(user: {
    id: string;
    email: string;
    createdAt: Date;
  }): AuthResponse {
    const accessToken = this.jwt.sign({ sub: user.id, email: user.email });
    return {
      user: this.toPublic(user),
      tokens: { accessToken },
    };
  }

  private toPublic(user: {
    id: string;
    email: string;
    createdAt: Date;
  }): SharedUser {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
