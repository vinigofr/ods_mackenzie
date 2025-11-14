import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';
import { DescartesModule } from '../descartes/descartes.module';
import { PontosDescarteModule } from '../pontos-descarte/pontos-descarte.module';

@Module({
  imports: [DescartesModule, PontosDescarteModule],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}
