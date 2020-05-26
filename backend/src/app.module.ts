import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadeModule } from './unidade/unidade.module';
import { CursoModule } from './curso/curso.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/uccdaac',{useCreateIndex: true,useNewUrlParser: true}),UnidadeModule, CursoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
