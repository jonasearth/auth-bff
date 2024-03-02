import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthIntegration {
  constructor(private readonly httpService: HttpService) {}

  async login(userId: string, password: string) {
    const response = await this.httpService.axiosRef.post(`login/`, {
      userId,
      password,
    });
    return response.data;
  }
}
