import { Module } from '@nestjs/common';
import { SyslogService } from './syslog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyslogEntity } from './model/syslog.entity';
import { SyslogRepository } from './syslog.repository';
@Module({
  imports: [TypeOrmModule.forFeature([SyslogEntity])],
  providers: [SyslogRepository, SyslogService],
  exports: [SyslogRepository, SyslogService],
})
export class SyslogModule {}
