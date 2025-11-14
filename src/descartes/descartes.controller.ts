import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DescartesService } from './descartes.service';
import { CreateDescarteDto } from './dto/create-descarte.dto';
import { FilterDescarteDto } from './dto/filter-descarte.dto';

@Controller('descartes')
export class DescartesController {
  constructor(private readonly descartesService: DescartesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDescarteDto: CreateDescarteDto) {
    return this.descartesService.create(createDescarteDto);
  }

  @Get()
  findAll(@Query() filters: FilterDescarteDto) {
    return this.descartesService.findAll(filters);
  }
}
