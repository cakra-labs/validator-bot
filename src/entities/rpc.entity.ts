import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rpc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegramChatId: number;

  @Column()
  url: string;
}
