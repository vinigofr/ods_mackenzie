import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  PontoDescarte,
  PontoDescarteDocument,
} from './schemas/ponto-descarte.schema';
import { CreatePontoDescarteDto } from './dto/create-ponto-descarte.dto';

@Injectable()
export class PontosDescarteService {
  constructor(
    @InjectModel(PontoDescarte.name)
    private pontoDescarteModel: Model<PontoDescarteDocument>,
  ) {}

  async create(
    createPontoDescarteDto: CreatePontoDescarteDto,
  ): Promise<PontoDescarte> {
    const createdPontoDescarte = new this.pontoDescarteModel(
      createPontoDescarteDto,
    );
    return createdPontoDescarte.save();
  }

  async findAll(): Promise<PontoDescarte[]> {
    return this.pontoDescarteModel.find().exec();
  }

  async findOne(id: string): Promise<PontoDescarte | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.pontoDescarteModel.findById(id).exec();
  }
}
