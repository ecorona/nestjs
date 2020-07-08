import { Injectable } from '@nestjs/common';
import { SyslogEntity } from './model/syslog.entity';
import { SyslogRepository } from './syslog.repository';
@Injectable()
export class SyslogService {
  constructor(private readonly _syslogRepository: SyslogRepository) {}

  create(log: SyslogEntity): Promise<SyslogEntity> {
    return this._syslogRepository.create(log);
  }
}
