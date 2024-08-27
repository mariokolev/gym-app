import Permission from "../entities/Permission";
import User from "../entities/User";
import UserResponseDTO from "./UserResponseDTO";

export default class UserInfoResponseDTO extends UserResponseDTO {
    private permissions: string[];
    constructor(user: User) {
        super(user);
        this.permissions = user.role.permissions.map((permission: Permission) => permission.permissionName);
    }
}