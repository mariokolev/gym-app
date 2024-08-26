import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Gym from "./Gym";

@Entity('gym_locations')
export default class GymLocation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: 'gym_name'})
    name!: string;

    @Column()
    address!: string;

    @ManyToOne(() => Gym)
    gym!: Gym
}