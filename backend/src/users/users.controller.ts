import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }   

}
