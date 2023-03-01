import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";

import { CreateUserDto } from "src/users/dto/create-user.dto";

import { UsersService } from "src/users/users.service";

import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    return;
  }

  async signup(userDto: CreateUserDto) {
    const newUser = await this.userService.getUserById(userDto.email);

    if (newUser) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const paylaod = { email: user.email, id: user.id, roles: user.roles }

    return{
      token: this.jwtService.sign(paylaod)
    }
  }
}
