export class FilterDescarteDto {
  pontoDescarteId?: string;
  tipoResiduo?: 'plastico' | 'papel' | 'organico' | 'eletronico' | 'vidro';
  data?: string;
  nomeUsuario?: string;
}
