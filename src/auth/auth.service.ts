import { Inject, Injectable } from '@nestjs/common';
import { UserIntegration } from '../user/user.integration';
import { AuthIntegration } from './auth.integration';
import { Logger } from 'winston';
import { SignUpDTO } from './dto/sign-up.dto';
import { ModulesEnum } from './enum/modules.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userIntegration: UserIntegration,
    private readonly authIntegration: AuthIntegration,
    @Inject('winston') private readonly logger: Logger,
  ) {}
  async login(dto: any) {
    try {
      const user = await this.userIntegration.getUserByEmail(dto.email);
      if (!user) {
        throw new Error('User not found!');
      }
      const authResponse = await this.authIntegration.login(
        user.id,
        dto.password,
      );
      return authResponse;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async signUp(dto: SignUpDTO) {
    try {
      const { password, ...userDto } = dto;
      const user = await this.userIntegration.createUser(userDto);
      await this.authIntegration.signUp(
        user.id,
        password,
        [...Object.values(ModulesEnum)], //adiciona acesso a todos os módulos
      );
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
