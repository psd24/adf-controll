import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm";
import { Organization } from './organization.entity';
import { UserEvent } from "./user-event.entity";

@Entity('vehicle')
export class Vehicle {
    @PrimaryGeneratedColumn({ name: 'ID_Vehicle'})
    public id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    code: string;

    @ManyToOne(type => Organization, organization => organization.vehicle)
    organization: Organization;

    @ManyToMany(() => UserEvent, event => event.vehicle)
    events: UserEvent[];

    constructor(name: string) {
        this.name = name;
    }
}