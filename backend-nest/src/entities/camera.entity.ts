import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  BeforeInsert,
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
  organization: Organization;

  @ManyToOne( () => CameraType, cameraType => cameraType.camera)
  cameraType: CameraType;

  @BeforeInsert()
  preProcess() {
    //console.log(this.cameraType);
  }
}
