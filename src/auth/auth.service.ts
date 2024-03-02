import { Inject, Injectable } from '@nestjs/common';
import { UserIntegration } from '../user/user.integration';
import { AuthIntegration } from './auth.integration';
import { Logger } from 'winston';

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
        throw new Error('User not found');
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
}
