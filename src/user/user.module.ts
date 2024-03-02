import { Module } from '@nestjs/common';
import { UserIntegration } from './user.integration';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `${process.env.USER_SERVICE_NAME}:${process.env.USER_SERVICE_PORT}/users/`,
      timeout: 5000,
    }),
  ],
  exports: [UserIntegration],
})
export class UserModule {}
