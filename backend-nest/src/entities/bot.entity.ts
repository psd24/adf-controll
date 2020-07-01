import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, ManyToMany, BeforeUpdate } from "typeorm";

import { Exclude } from 'class-transformer';
import { hash } from "bcryptjs";
import { Role } from "./role.entity";
import { Organization } from "./organization.entity";
import { UserEvent } from "./user-event.entity";

@Entity({ name: 'botDetail' })
export class BotDetail {
    @PrimaryGeneratedColumn({ name: 'Telegram_ID'})
    public id: number;

    @Column()
    chatId: number;

    @Column()
    userStep:string

    @Column()
    telegramUsername:string

    @Column()
    telegramPassword:string


}
