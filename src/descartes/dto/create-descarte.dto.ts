export class CreateDescarteDto {
  nomeUsuario: string;
  pontoDescarteId: string;
  tipoResiduo: 'plastico' | 'papel' | 'organico' | 'eletronico' | 'vidro';
  data?: Date;
}
