export const ErrorMessages = {
    MISSING_TOKEN: 'Access denied, token missing!',
    INVALID_TOKEN: 'Invalid token.',
    INVALID_CREDENTIALS: 'Invalid credentials.',
    UNAUTHORIZED: 'You are not authorized to access this resource.',
    SERVER_ERROR: 'Internal Server Error',
    JWT_DECODE_ERROR: 'Error decoding token',
    JWT_SIGN_ERROR:  'Error signing token',

    unexpectedError: (message: string) => `Unexpected error: ${message}`,
    userIdNotFound: (id: number) => `User with id: ${id} not found`,
    userEmailNotFound: (email: string) => `User with email: ${email} not found`,
}