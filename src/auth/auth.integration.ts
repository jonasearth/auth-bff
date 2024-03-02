import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ModulesEnum } from './enum/modules.enum';

@Injectable()
export class AuthIntegration {
  constructor(private readonly httpService: HttpService) {}

  async login(userId: string, password: string) {
    const response = await this.httpService.axiosRef.post(`login/`, {
      userId,
      password,
    });
    return response;
  }

  async signUp(userId: string, password: string, modules: ModulesEnum[]) {
    const response = await this.httpService.axiosRef.post(`sign-up/`, {
      userId,
      password,
      modules,
    });
    return response;
  }
}
