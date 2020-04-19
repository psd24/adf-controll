import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Camera } from './camera.entity';

@Entity('camera-type')
export class CameraType {
    @PrimaryGeneratedColumn({ name: 'ID_Camera_Type'})
    public id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @OneToMany(type => Camera, camera => camera.cameraType)
    camera: Camera;

    constructor(name: string) {
        this.name = name;
    }
}