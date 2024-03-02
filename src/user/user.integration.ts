import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SignUpDTO } from '../auth/dto/sign-up.dto';
import { UserEntityDTO } from './dto/user-entity.dto';

@Injectable()
export class UserIntegration {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(userId: string): Promise<UserEntityDTO> {
    return await this.httpService.axiosRef.get(`${userId}`);
  }

  async getUserByEmail(email: string): Promise<UserEntityDTO> {
    return await this.httpService.axiosRef.get(`find?email=${email}`);
  }

  async createUser(userDto: Partial<SignUpDTO>): Promise<UserEntityDTO> {
    return await this.httpService.axiosRef.post('', userDto);
  }
}
