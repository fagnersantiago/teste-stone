/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../create/users.module';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY, 'base64').toString(
          'base64',
        ),

        publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY, 'base64').toString(
          'base64',
        ),
        signOptions: { expiresIn: '1d' },
        verifyOptions: { algorithms: ['RS256'] },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
