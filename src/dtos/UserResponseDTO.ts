import User from "../entities/User";

export default class UserResponseDTO {
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private role: string;

    constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role.roleName;
    }
}