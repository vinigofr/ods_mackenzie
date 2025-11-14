import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Descarte, DescarteDocument } from './schemas/descarte.schema';
import { CreateDescarteDto } from './dto/create-descarte.dto';
import { FilterDescarteDto } from './dto/filter-descarte.dto';
import { PontosDescarteService } from '../pontos-descarte/pontos-descarte.service';

@Injectable()
export class DescartesService {
  constructor(
    @InjectModel(Descarte.name)
    private descarteModel: Model<DescarteDocument>,
    private pontosDescarteService: PontosDescarteService,
  ) {}

  async create(createDescarteDto: CreateDescarteDto): Promise<Descarte> {
    if (!Types.ObjectId.isValid(createDescarteDto.pontoDescarteId)) {
      throw new NotFoundException('Ponto de descarte não encontrado');
    }

    const pontoDescarte = await this.pontosDescarteService.findOne(
      createDescarteDto.pontoDescarteId,
    );

    if (!pontoDescarte) {
      throw new NotFoundException('Ponto de descarte não encontrado');
    }

    const descarte = {
      ...createDescarteDto,
      pontoDescarteId: new Types.ObjectId(createDescarteDto.pontoDescarteId),
      data: createDescarteDto.data || new Date(),
    };

    const createdDescarte = new this.descarteModel(descarte);
    return createdDescarte.save();
  }

  async findAll(filters?: FilterDescarteDto): Promise<Descarte[]> {
    const query: FilterQuery<DescarteDocument> = {};

    if (filters?.pontoDescarteId) {
      if (Types.ObjectId.isValid(filters.pontoDescarteId)) {
        query.pontoDescarteId = new Types.ObjectId(filters.pontoDescarteId);
      } else {
        return [];
      }
    }

    if (filters?.tipoResiduo) {
      query.tipoResiduo = filters.tipoResiduo;
    }

    if (filters?.nomeUsuario) {
      query.nomeUsuario = { $regex: filters.nomeUsuario, $options: 'i' };
    }

    if (filters?.data) {
      const data = new Date(filters.data);
      const inicioDia = new Date(data);
      inicioDia.setHours(0, 0, 0, 0);
      const fimDia = new Date(data);
      fimDia.setHours(23, 59, 59, 999);
      query.data = { $gte: inicioDia, $lte: fimDia };
    }

    return this.descarteModel.find(query).populate('pontoDescarteId').exec();
  }

  async findAllForReport(): Promise<Descarte[]> {
    return this.descarteModel.find().populate('pontoDescarteId').exec();
  }
}
