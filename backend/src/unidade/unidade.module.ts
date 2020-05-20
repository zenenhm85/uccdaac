import { Module } from '@nestjs/common';
import { UnidadeController } from './unidade.controller';
import { UnidadeService } from './unidade.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UnidadeSchema} from './schemas/unidade.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Unidade',schema:UnidadeSchema}
  ])],
  controllers: [UnidadeController],
  providers: [UnidadeService]
})
export class UnidadeModule {}
