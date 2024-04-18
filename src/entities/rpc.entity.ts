import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['telegramChatId', 'url'])
export class Rpc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegramChatId: number;

  @Column()
  url: string;
}
