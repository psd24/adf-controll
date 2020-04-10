import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from "typeorm";

import { Exclude } from 'class-transformer';
import { hash } from "bcrypt";
import { Role } from "./role.entity";
import { Organization } from "./organization.entity";

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
  
  @ManyToOne(() => Organization, organization => organization.users)
  organization: Organization;
  
  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  preProcess() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }
}
