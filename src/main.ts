import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from './common/enum/configkeys.enum';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const _configService = app.get(ConfigService);

  app.setGlobalPrefix(_configService.get<string>(ConfigKeys.API_ROUTE));

  app.use(helmet());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.set('trust proxy', 1);

  await app.listen(_configService.get<string>(ConfigKeys.PORT));
}

bootstrap();
