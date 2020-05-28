import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import {UserSchema} from './schemas/user.schemas';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports:[MongooseModule.forFeature([
    {name:'User',schema:UserSchema}
  ]),
  PassportModule
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
