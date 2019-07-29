export const ENVIRONMENT_FILENAME = '.env';

export const ENVIRONMENTS = {
  Prod: 'production',
  Dev: 'development'
};

export const getCurrentEnvironment = (): string =>
  process.env.NODE_ENV || ENVIRONMENTS.Prod;
