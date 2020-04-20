import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Vehicle } from './vehicle.entity';
import { Organization } from './organization.entity';

@Entity('event')
export class UserEvent {
    @Column({ name: 'ID_Event'})
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    population: string;

    @Column({ type: Date })
    dateInit: Date;

    @Column({ type: Date })
    dateEnd: Date;

    @ManyToMany(() => User, user => user.events)
    @JoinTable()
    users: User[];

    @ManyToOne(() => Organization, organization => organization.events)
    organization: Organization;

    @ManyToMany(() => Vehicle, vehicle => vehicle.events)
    @JoinTable()
    vehicle: Vehicle[];
}
