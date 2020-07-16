import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    ManyToOne,
    ManyToMany,
    BeforeUpdate,
    OneToMany
} from "typeorm";

import { Exclude } from 'class-transformer';
import { hash } from "bcryptjs";
import { Role } from "./role.entity";
import { Organization } from "./organization.entity";
import { UserEvent } from "./user-event.entity";
import {Camera} from "./camera.entity";
import {User} from "./user.entity";
import {CameraType} from "./camera-type.entity";

@Entity({ name: 'CameraUser' })
export class CameraUser {
    @PrimaryGeneratedColumn({ name: 'ID_CameraUser'})
    public id: number;


    @ManyToOne(() => Camera)
    camera: Camera;


    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Organization)
    organization:Organization

    @ManyToOne(() => CameraType)
    cameraType:CameraType

}
