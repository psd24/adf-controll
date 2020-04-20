import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Vehicle } from "./vehicle.entity";
import { Camera } from "./camera.entity";
import { UserEvent } from "./user-event.entity";

@Entity('organization')
export class Organization {
    @PrimaryGeneratedColumn({ name: 'ID_Organization'})
    public id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @OneToMany(() => User, user => user.role)
    users: User[];

    @OneToMany(type => Vehicle, vehicle => vehicle.organization)
    vehicle: Vehicle[];

    @OneToMany(type => Camera, camera => camera.organization)
    camera: Camera[];

    @OneToMany(type => UserEvent, events => events.organization)
    events: UserEvent[];

    constructor(name: string) {
        this.name = name;
    }
}