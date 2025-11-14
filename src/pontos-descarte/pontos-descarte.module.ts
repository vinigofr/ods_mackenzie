import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PontosDescarteController } from './pontos-descarte.controller';
import { PontosDescarteService } from './pontos-descarte.service';
import {
  PontoDescarte,
  PontoDescarteSchema,
} from './schemas/ponto-descarte.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PontoDescarte.name, schema: PontoDescarteSchema },
    ]),
  ],
  controllers: [PontosDescarteController],
  providers: [PontosDescarteService],
  exports: [PontosDescarteService],
})
export class PontosDescarteModule {}
