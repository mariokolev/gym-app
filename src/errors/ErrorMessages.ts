export const ErrorMessages = {
    MISSING_TOKEN: 'Access denied, token missing!',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token.',
    INVALID_CREDENTIALS: 'Invalid credentials.',
    UNAUTHORIZED: 'You are not authorized to access this resource.',
    SERVER_ERROR: 'Internal Server Error',

    userIdNotFound: (id: number) => `User with id: ${id} not found`,
    userEmailNotFound: (email: string) => `User with email: ${email} not found`,
}