import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";

@Entity('permissions')
export default class Permission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'permission_name' })
    permissionName!: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles!: Role[];
}