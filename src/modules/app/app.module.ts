import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigKeys } from '../../common/enum/configkeys.enum';
import { SyslogEntity } from '../../modules/syslog/model/syslog.entity';
import { SyslogModule } from '../../modules/syslog/syslog.module';
import { SyslogInterceptor } from '../../modules/syslog/syslog.interceptor';
import { SyslogService } from '../../modules/syslog/syslog.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        API_ROUTE: Joi.string().default('api/v1'),

        //mysql
        MYSQL_DB: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true, 
        abortEarly: true, 
      },
      isGlobal: true, 
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        type: 'mysql',
        host: _configService.get<string>(ConfigKeys.MYSQL_HOST),
        port: parseInt(_configService.get<string>(ConfigKeys.MYSQL_PORT)),
        username: _configService.get<string>(ConfigKeys.MYSQL_USER),
        password: _configService.get<string>(ConfigKeys.MYSQL_PASSWORD),
        database: _configService.get<string>(ConfigKeys.MYSQL_DB),
        entities: [
          SyslogEntity,
        ],
        synchronize: true, //generación  y sincronización de las tablas segun el entity
      }),
    }),
    SyslogModule
  ],
  controllers: [AppController],
  providers: [
    {
      //interceptor de log de sistema
      provide: APP_INTERCEPTOR,
      useClass: SyslogInterceptor,
    },
    AppService, 
    ConfigService,
    SyslogService
  ],
})
export class AppModule {}
