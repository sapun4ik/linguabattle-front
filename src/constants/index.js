// export const API_BASE_URL = 'http://localhost:8080';
export const API_BASE_URL = 'http://applinguabattle-env.eba-fgqg2dve.us-east-2.elasticbeanstalk.com';
export const ACCESS_TOKEN = 'accessToken';

// export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const OAUTH2_REDIRECT_URI = 'https://master.dortucnmo4ui7.amplifyapp.com/oauth2/redirect';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
