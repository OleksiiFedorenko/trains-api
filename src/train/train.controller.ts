import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { JwtAuthGuard } from '../auth/guards';
import { TrainCreateDto, TrainFindDto, TrainUpdateDto } from './dto';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TrainCreateDto) {
    return this.trainService.create(dto);
  }

  @Get()
  find(@Query() dto: TrainFindDto) {
    return this.trainService.find(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePartly(@Param('id') id: string, @Body() dto: TrainUpdateDto) {
    const train = await this.trainService.update(id, dto);
    if (!train) throw new NotFoundException('Train not found');
    return train;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async fullUpdate(@Param('id') id: string, @Body() dto: TrainCreateDto) {
    const train = await this.trainService.update(id, dto);
    if (!train) throw new NotFoundException('Train not found');
    return train;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const removed = await this.trainService.delete(id);
    if (!removed) throw new NotFoundException('Train not found');
    return removed;
  }
}
