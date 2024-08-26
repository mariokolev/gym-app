export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InvalidCredentials extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCredentials';
    }
}
