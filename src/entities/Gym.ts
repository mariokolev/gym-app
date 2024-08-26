import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('gyms')
export default class Gym {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}