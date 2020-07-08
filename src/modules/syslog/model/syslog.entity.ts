import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
/**
 * @ignore
 */
@Entity('syslog')
export class SyslogEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  route?: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  method?: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  ip?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  useragent?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt' })
  updatedAt: Date;
  constructor(
    route: string,
    method: string,
    ip: string,
    useragent: string,
  ) {
    this.route = route;
    this.method = method;
    this.ip = ip;
    this.useragent = useragent;
  }
}
