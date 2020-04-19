import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Organization } from './organization.entity';
import { CameraType } from './camera-type.entity';

@Entity('camera')
export class Camera {
    @PrimaryGeneratedColumn({ name: 'ID_Camera'})
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

    @ManyToOne(type => Organization, organization => organization.camera)
    organization: Organization;

    @ManyToOne(type => CameraType, cameraType => cameraType.camera)
    cameraType: CameraType[];

    constructor(name: string) {
        this.name = name;
    }
}