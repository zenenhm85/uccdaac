import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnidadeModule } from './unidade/unidade.module';
import { CursoModule } from './curso/curso.module';
import {MulterModule} from '@nestjs/platform-express';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true },
    ),
    MongooseModule.forRoot('mongodb://localhost/uccdaac',{useCreateIndex: true,useNewUrlParser: true}),
    MulterModule.register({
      dest:'./uploads'
    }),
    UnidadeModule,
    CursoModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
