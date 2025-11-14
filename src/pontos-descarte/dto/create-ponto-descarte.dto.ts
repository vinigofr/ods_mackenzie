export class CreatePontoDescarteDto {
  nome: string;
  bairro: string;
  tipoLocal: 'publico' | 'privado';
  categoriasResiduos: string[];
  geolocalizacao: {
    latitude: number;
    longitude: number;
  };
}
