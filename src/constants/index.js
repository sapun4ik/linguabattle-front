export const API_BASE_URL = 'http://localhost:8080';
// export const API_BASE_URL = 'https://www.api.linguabattle.online';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
// export const OAUTH2_REDIRECT_URI = 'https://www.linguabattle.online/oauth2/redirect';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const VK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/vk?redirect_uri=' + OAUTH2_REDIRECT_URI;
