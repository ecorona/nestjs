import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SyslogService } from './syslog.service';
import { SyslogEntity } from './model/syslog.entity';
/**
 * El objetivo de este interceptor es guardar en base de datos
 * todas las solicitudes y sus detalles para futuras inspecciones.
 */
@Injectable()
export class SyslogInterceptor implements NestInterceptor {
  constructor(private readonly _syslogService: SyslogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    this._syslogService.create(new SyslogEntity(
      req.route.path,
      req.method,
      req.ip,
      req.headers['user-agent'],
    ));

    return next.handle();
  }
}
