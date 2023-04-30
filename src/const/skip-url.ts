import SERVER from "./request";

export default [
  process.env.API_CALL + SERVER.USER_LOGIN,
  process.env.API_CALL + SERVER.POST_NEW_PHYS_USER,
  process.env.API_CALL + SERVER.REFRESH_SESSION
];
