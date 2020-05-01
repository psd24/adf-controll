import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  BeforeInsert,
  JoinTable,
} from 'typeorm';
import { Organization } from './organization.entity';
import { CameraType } from './camera-type.entity';

@Entity('camera')
export class Camera {
  @PrimaryGeneratedColumn({ name: 'ID_Camera' })
  public id: number;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column()
  port: string;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column()
  url: string;

  @ManyToOne(() => Organization, organization => organization.camera)
  @JoinTable()
  organization: Organization;

  @ManyToOne( () => CameraType, cameraType => cameraType.camera)
  @JoinTable()
  cameraType: CameraType;

  @BeforeInsert()
  preProcess() {
    //console.log(this.cameraType);
  }
}
