import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  urlCode: string;
  @Column()
  longUrl: string;
  @Column()
  shortUrl: string;
  @CreateDateColumn({ type: 'timestamp',nullable:true})
  created: Date;
}
