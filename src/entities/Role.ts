import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, } from "typeorm";
import Permission from './Permission';

@Entity('roles')
export default class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'role_name', unique: true})
    roleName!: string;

    @ManyToMany(() => Permission, permission => permission.roles, { eager: true })
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions!: Permission[];
}