import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface Entities {
  id: string;
  token: string;
  user_id: string;
}

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column()
  @Generated('uuid')
  private token: string;

  @Column()
  private user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor({ id, token, user_id }: Entities) {
    this.id = id;
    this.token = token;
    this.user_id = user_id;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getUser_id(): string {
    return this.user_id;
  }

  public setUser_id(user_id: string): void {
    this.user_id = user_id;
  }
}

export default UserToken;