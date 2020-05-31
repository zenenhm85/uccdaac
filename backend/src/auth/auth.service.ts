import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/user.dto';




@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user:CreateUserDTO = await this.usersService.findOne(username,pass);
    if (user) {
      const { password, ...result } = user;
      this.usersService.usersTrash();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username};
    return {
      token: this.jwtService.sign(payload),
    };
  }
  
  
}