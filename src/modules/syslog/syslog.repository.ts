import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SyslogEntity } from './model/syslog.entity';
/**
 * Syslog Repository
 */
@Injectable()
export class SyslogRepository {
  constructor(
    @InjectRepository(SyslogEntity)
    private readonly _syslogRepository: Repository<SyslogEntity>,
  ) {}

  async create(log: SyslogEntity): Promise<SyslogEntity> {
    return this._syslogRepository.save(log);
  }

}
