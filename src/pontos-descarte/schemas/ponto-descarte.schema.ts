import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PontoDescarteDocument = PontoDescarte & Document;

@Schema({ timestamps: true })
export class PontoDescarte {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  bairro: string;

  @Prop({ required: true, enum: ['publico', 'privado'] })
  tipoLocal: string;

  @Prop({ required: true, type: [String] })
  categoriasResiduos: string[];

  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  })
  geolocalizacao: {
    latitude: number;
    longitude: number;
  };
}

export const PontoDescarteSchema = SchemaFactory.createForClass(PontoDescarte);
