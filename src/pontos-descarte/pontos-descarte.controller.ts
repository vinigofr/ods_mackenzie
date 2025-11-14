import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PontosDescarteService } from './pontos-descarte.service';
import { CreatePontoDescarteDto } from './dto/create-ponto-descarte.dto';

@Controller('pontos-descarte')
export class PontosDescarteController {
  constructor(private readonly pontosDescarteService: PontosDescarteService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPontoDescarteDto: CreatePontoDescarteDto) {
    return this.pontosDescarteService.create(createPontoDescarteDto);
  }

  @Get()
  findAll() {
    return this.pontosDescarteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pontoDescarte = await this.pontosDescarteService.findOne(id);
    if (!pontoDescarte) {
      throw new NotFoundException('Ponto de descarte não encontrado');
    }
    return pontoDescarte;
  }
}
