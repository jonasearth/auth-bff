import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserIntegration {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(userId: string) {
    return `This action returns a #${userId} user`;
  }

  async getUserByEmail(email: string) {
    const response = await this.httpService.axiosRef.get(`find?email=${email}`);
    return response.data;
  }

  async createUser() {
    return `This action creates a new user`;
  }
}
