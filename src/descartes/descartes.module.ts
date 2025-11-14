import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DescartesController } from './descartes.controller';
import { DescartesService } from './descartes.service';
import { Descarte, DescarteSchema } from './schemas/descarte.schema';
import { PontosDescarteModule } from '../pontos-descarte/pontos-descarte.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Descarte.name, schema: DescarteSchema },
    ]),
    PontosDescarteModule,
  ],
  controllers: [DescartesController],
  providers: [DescartesService],
  exports: [DescartesService],
})
export class DescartesModule {}
