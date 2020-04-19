import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Organization } from './organization.entity';

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

    constructor(name: string) {
        this.name = name;
    }
}