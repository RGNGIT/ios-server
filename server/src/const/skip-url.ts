import SERVER from './req';

export default [
    process.env.API_CALL + SERVER.USER_LOGIN,
    process.env.API_CALL + SERVER.POST_NEW_PHYS_USER
];
