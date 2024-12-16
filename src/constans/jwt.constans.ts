export const JwtConstans = {
  access: {
    secret: process.env.ACCESS_SECRET || 'qwertytr',
    exporesTime: process.env.ACCESS_EXPIRES || '10m',
  },
  refresh: {
    secret: process.env.REFRESH_SECRET || 'qwewrwt',
    exporesTime: process.env.REFRESH_EXPIRES || '10m',
  },
};
