import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { DescartesService } from '../descartes/descartes.service';
import { PontosDescarteService } from '../pontos-descarte/pontos-descarte.service';
import { PontoDescarteDocument } from '../pontos-descarte/schemas/ponto-descarte.schema';

@Injectable()
export class RelatorioService {
  constructor(
    private descartesService: DescartesService,
    private pontosDescarteService: PontosDescarteService,
  ) {}

  async gerarRelatorio() {
    const descartes = await this.descartesService.findAllForReport();
    const pontosDescarte = await this.pontosDescarteService.findAll();

    // Local de descarte com maior número de registros
    const contagemPorPonto: Record<string, number> = {};
    descartes.forEach((descarte) => {
      let pontoId: string;
      if (
        typeof descarte.pontoDescarteId === 'object' &&
        descarte.pontoDescarteId !== null &&
        !(descarte.pontoDescarteId instanceof Types.ObjectId)
      ) {
        const pontoPopulado =
          descarte.pontoDescarteId as unknown as PontoDescarteDocument;
        pontoId = pontoPopulado._id?.toString() || '';
      } else {
        pontoId = descarte.pontoDescarteId.toString();
      }
      contagemPorPonto[pontoId] = (contagemPorPonto[pontoId] || 0) + 1;
    });

    let localMaisRegistros: string | null = null;
    let maxRegistros = 0;
    for (const [pontoId, count] of Object.entries(contagemPorPonto)) {
      if (count > maxRegistros) {
        maxRegistros = count;
        const ponto = pontosDescarte.find((p) => {
          const doc = p as unknown as PontoDescarteDocument;
          return doc._id?.toString() === pontoId;
        });
        localMaisRegistros = ponto ? ponto.nome : null;
      }
    }

    // Tipo de resíduo mais frequentemente descartado
    const contagemPorTipo: Record<string, number> = {};
    descartes.forEach((descarte) => {
      contagemPorTipo[descarte.tipoResiduo] =
        (contagemPorTipo[descarte.tipoResiduo] || 0) + 1;
    });

    let tipoMaisFrequente: string | null = null;
    let maxTipo = 0;
    for (const [tipo, count] of Object.entries(contagemPorTipo)) {
      if (count > maxTipo) {
        maxTipo = count;
        tipoMaisFrequente = tipo;
      }
    }

    // Média de descartes por dia nos últimos 30 dias
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);
    const trintaDiasAtras = new Date(hoje);
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    trintaDiasAtras.setHours(0, 0, 0, 0);

    const descartesUltimos30Dias = descartes.filter((descarte) => {
      const dataDescarte = new Date(descarte.data);
      return dataDescarte >= trintaDiasAtras && dataDescarte <= hoje;
    });

    const diasUnicos = new Set(
      descartesUltimos30Dias.map(
        (d) => new Date(d.data).toISOString().split('T')[0],
      ),
    ).size;

    const mediaDescartesPorDia =
      diasUnicos > 0 ? descartesUltimos30Dias.length / diasUnicos : 0;

    // Número total de usuários no sistema
    const usuariosUnicos = new Set(descartes.map((d) => d.nomeUsuario)).size;

    // Total de pontos de descarte cadastrados
    const totalPontosDescarte = pontosDescarte.length;

    // Percentual de crescimento ou redução comparado ao mês anterior
    const hojeMes = new Date();
    const inicioMesAtual = new Date(
      hojeMes.getFullYear(),
      hojeMes.getMonth(),
      1,
    );
    inicioMesAtual.setHours(0, 0, 0, 0);
    const fimMesAtual = new Date(
      hojeMes.getFullYear(),
      hojeMes.getMonth() + 1,
      0,
    );
    fimMesAtual.setHours(23, 59, 59, 999);
    const inicioMesAnterior = new Date(
      hojeMes.getFullYear(),
      hojeMes.getMonth() - 1,
      1,
    );
    inicioMesAnterior.setHours(0, 0, 0, 0);
    const fimMesAnterior = new Date(
      hojeMes.getFullYear(),
      hojeMes.getMonth(),
      0,
    );
    fimMesAnterior.setHours(23, 59, 59, 999);

    const descartesMesAtual = descartes.filter((descarte) => {
      const dataDescarte = new Date(descarte.data);
      return dataDescarte >= inicioMesAtual && dataDescarte <= fimMesAtual;
    }).length;

    const descartesMesAnterior = descartes.filter((descarte) => {
      const dataDescarte = new Date(descarte.data);
      return (
        dataDescarte >= inicioMesAnterior && dataDescarte <= fimMesAnterior
      );
    }).length;

    let percentualVariacao = 0;
    if (descartesMesAnterior > 0) {
      percentualVariacao =
        ((descartesMesAtual - descartesMesAnterior) / descartesMesAnterior) *
        100;
    } else if (descartesMesAtual > 0) {
      percentualVariacao = 100;
    }

    return {
      localMaisRegistros: localMaisRegistros || 'N/A',
      tipoResiduoMaisFrequente: tipoMaisFrequente || 'N/A',
      mediaDescartesPorDia: Math.round(mediaDescartesPorDia * 100) / 100,
      totalUsuarios: usuariosUnicos,
      totalPontosDescarte: totalPontosDescarte,
      percentualVariacao: Math.round(percentualVariacao * 100) / 100,
    };
  }
}
