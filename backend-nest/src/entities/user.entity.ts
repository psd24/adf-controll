import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, ManyToMany, BeforeUpdate } from "typeorm";

import { Exclude } from 'class-transformer';
import { hash } from "bcryptjs";
import { Role } from "./role.entity";
import { Organization } from "./organization.entity";
import { UserEvent } from "./user-event.entity";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'ID_User'})
  public id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  
  @Column()
  code: string;

  @Column()
  refresh_camera: number;
  
  @ManyToOne(() => Organization, organization => organization.users)
  organization: Organization;
  
  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @ManyToMany(() => UserEvent, event => event.users)
  events: UserEvent[];

  @Column()
  @Exclude()
  password: string;

  @Column()
  authorizeConnection: string;

  @Column()
  chatId: number;

  @Column()
  sendPassword: string;

  @BeforeInsert()
  preProcess() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }

  @BeforeUpdate()
  preProcessUpdate() {
    if (this.password) {
      return hash(this.password, 10).then(
        encrypted => (this.password = encrypted),
      );
    }
  }
}
