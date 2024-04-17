import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rpc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegramChatId: string;

  @Column()
  url: string;
}