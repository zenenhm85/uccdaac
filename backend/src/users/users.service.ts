
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';




@Injectable()
export class UsersService {

  private users: CreateUserDTO[] = []; // Array de usuarios provisionalmente

  constructor(@InjectModel('User') private usersModel: Model<User>) {

  }
  async usersTrash(): Promise<void> {
    this.users = [];
  }
  private async pushUsersFromDB(): Promise<void> {
    const authUsers = await this.usersModel.find();
    for (const user of authUsers) {
      const { username, password} = user;
      const userObj: CreateUserDTO = { username, password};
      this.users.push(userObj);
    }
  }

  async findOne(username: string, password: string): Promise<CreateUserDTO> {
    let userObj: CreateUserDTO;

    this.pushUsersFromDB();

    for (const hash of this.users) {
      const userExists = await bcrypt.compare(username, hash.username)
        .then((res: boolean | undefined) => res);
      const passwordExists = await bcrypt.compare(password, hash.password)
        .then((res: boolean | undefined) => res);

      if (userExists && passwordExists) {
        userObj = { username: hash.username, password: hash.password};
        return userObj;
      }
    }
  }  
}