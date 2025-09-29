import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { TrainCreateDto, TrainFindDto, TrainUpdateDto } from './dto';

@Injectable()
export class TrainService {
  constructor(private prisma: PrismaService) {}

  async create(data: TrainCreateDto) {
    console.log('data', data);
    const existedTrain = await this.prisma.train.findUnique({ where: { number: data.number } })
    console.log('existedTrain', existedTrain);
    if (existedTrain) throw new BadRequestException('Train with such number already exists');
    return this.prisma.train.create({ data });
  }

  async find({ number, city }: TrainFindDto) {
    if (!number && !city) {
      return this.prisma.train.findMany({ orderBy: { departure: 'asc' } });
    }

    if (number) {
      const train = await this.prisma.train.findUnique({ where: { number } });
      return [train];
    }

    if (city) {
      return this.prisma.train.findMany({
        where: {
          OR: [{ from: { contains: city, mode: 'insensitive' } }, { to: { contains: city, mode: 'insensitive' } }],
        },
        orderBy: { departure: 'asc' },
      });
    }
  }

  async update(id: string, data: TrainUpdateDto) {
    try {
      return this.prisma.train.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Train not exists');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return this.prisma.train.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Train not found for deletion');
      }
      throw error;
    }
  }
}
