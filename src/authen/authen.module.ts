import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, tokenDuration } from 'src/constants';
import { ManagerModule } from 'src/manager/manager.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/TypeOrms/ManagerEntity';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity, CustomerEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s` },
          secret: configService.get<string>('JWT_SECRET'),
        };
      }
    }),
    CustomerModule, ManagerModule, PassportModule, ConfigModule],
  controllers: [AuthenController],
  providers: [AuthenService, LocalStrategy, JwtStrategy]
})
export class AuthenModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([ManagerEntity, CustomerEntity]),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get('JWT_SECRET'),
//         signOptions: {
//           expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
//         },
//       }),
//     }), 
//     CustomerModule, ManagerModule, PassportModule, ConfigModule,],
//   controllers: [AuthenController],
//   providers: [AuthenService, LocalStrategy, JwtStrategy]
// })
// export class AuthenModule {}

// @Module({
//   imports: [TypeOrmModule.forFeature([ManagerEntity, CustomerEntity]),
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: tokenDuration},
//     }), CustomerModule, ManagerModule, PassportModule],
//   controllers: [AuthenController],
//   providers: [AuthenService, LocalStrategy, JwtStrategy]
// })
// export class AuthenModule {}
