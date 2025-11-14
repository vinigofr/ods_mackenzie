import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DescarteDocument = Descarte & Document;

@Schema({ timestamps: true })
export class Descarte {
  @Prop({ required: true })
  nomeUsuario: string;

  @Prop({ type: Types.ObjectId, ref: 'PontoDescarte', required: true })
  pontoDescarteId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['plastico', 'papel', 'organico', 'eletronico', 'vidro'],
  })
  tipoResiduo: string;

  @Prop({ required: true, default: Date.now })
  data: Date;
}

export const DescarteSchema = SchemaFactory.createForClass(Descarte);
