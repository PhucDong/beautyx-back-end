import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, tokenDuration } from 'src/constants';
import { ManagerModule } from 'src/manager/manager.module';

@Module({
  imports: [CustomerModule, ManagerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: tokenDuration},
    })],
  controllers: [AuthenController],
  providers: [AuthenService]
})
export class AuthenModule {}
