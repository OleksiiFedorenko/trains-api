import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const existedUser = await this.prisma.user.findUnique({ where: { email } });
    if (existedUser) throw new BadRequestException('User already exists');
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    const token = await this.jwt.signAsync({ email });
    return { user, token };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ email });
    const { password: _, ...safe } = user;
    return { user: safe, token };
  }
}
