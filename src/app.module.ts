import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TrainModule } from './train/train.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, TrainModule],
  providers: [PrismaService],
})
export class AppModule {}
