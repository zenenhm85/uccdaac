
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from './interface/user.interface';
import { CreateUserDTO, CreateUserDTO2, CreateUserDTO3 } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as fs from 'fs-extra';




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
      const { username, password } = user;
      const userObj: CreateUserDTO = { username, password };
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
        userObj = { username: hash.username, password: hash.password };
        return userObj;
      }
    }
  }
  async getUser(username: string): Promise<UserModel> {
    let userObj: UserModel;
    const users = await this.usersModel.find();
    for (const hash of users) {
      const userExists = await bcrypt.compare(username, hash.username);      
      if (userExists) {
        userObj = { username: hash.username, name: hash.name, email: hash.email, habilitado: hash.habilitado, tipo: hash.tipo, img: hash.img };
        return userObj;
      }
    }
    return null;
  }
  async getUserhash(username:string):Promise<User>{
    const user = await this.usersModel.findOne({username:username});
    return user;
  }
  async getUsers(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }
  async createUser(createUserDTO: CreateUserDTO2): Promise<User> {
    const user = new this.usersModel(createUserDTO);
    return await user.save();
  }

  async deleteUser(userID: string): Promise<User> {
    const user = await this.usersModel.findByIdAndDelete(userID);
    if (user.img != "default.png") {
      fs.unlink(path.resolve('./uploads/' + user.img));
    }
    return user;
  }
  async updateUser(userID: string, createuserDTO: CreateUserDTO3): Promise<User> {
    const updateUser = this.usersModel.findByIdAndUpdate(userID, createuserDTO, { new: true });
    return updateUser;
  }
  async deleteImg(img:string):Promise<any>{
    if (img != "default.png") {
      fs.unlink(path.resolve('./uploads/' + img));
      return true;
    }       
    return false;
  }
  async changePassword(createUserDTO: CreateUserDTO): Promise<User> {
    const updateUser = this.usersModel.findOneAndUpdate({username:createUserDTO.username},{password:createUserDTO.password});
    return updateUser;
  }
}