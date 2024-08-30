import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersRolesPermissions1724907862614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS roles(
                id SERIAL NOT NULL PRIMARY KEY,
                role_name VARCHAR(255) NOT NULL,
                inherit_role_id SMALLINT NULL,
                CONSTRAINT ux_roles_role_name UNIQUE(role_name),
                CONSTRAINT fk_roles_inherit_role_id FOREIGN KEY (inherit_role_id) REFERENCES roles(id)
            );
            CREATE INDEX IF NOT EXISTS ix_roles_inherit_role_id ON roles(inherit_role_id);

            CREATE TABLE IF NOT EXISTS permissions(
                id SERIAL NOT NULL PRIMARY KEY,
                permission_name VARCHAR(255) NOT NULL,
                CONSTRAINT ux_permissions_permission_name UNIQUE(permission_name)
            );

            CREATE TABLE IF NOT EXISTS roles_permissions(
                role_id BIGINT NOT NULL,
                permission_id BIGINT NOT NULL,
                CONSTRAINT fk_roles_permissions_role_id FOREIGN KEY(role_id) REFERENCES roles(id),
                CONSTRAINT fk_roles_permissions_permission_id FOREIGN KEY(permission_id) REFERENCES permissions(id)
            );
            CREATE INDEX IF NOT EXISTS ix_roles_permissions_rule_id ON roles_permissions(role_id);
            CREATE INDEX IF NOT EXISTS ix_roles_permissions_permission_id ON roles_permissions(permission_id);

            CREATE TABLE IF NOT EXISTS USERS(
                id BIGSERIAL NOT NULL PRIMARY KEY,
                email VARCHAR(320) NOT NULL,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                role_id SMALLINT NOT NULL,
                active BOOL DEFAULT TRUE,
                created_ts TIMESTAMP DEFAULT NOW(),
                updated_ts TIMESTAMP DEFAULT NOW(),
                CONSTRAINT ux_users_email UNIQUE(email),
                CONSTRAINT fk_users_role_id FOREIGN KEY(role_id) REFERENCES roles(id)
            );
            CREATE INDEX IF NOT EXISTS ix_users_role_id ON users(role_id);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
