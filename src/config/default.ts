const config = {
  PORT: parseInt(process.env.PORT as string, 10) ?? 3000,
  ENTITIES_PATH: 'src/modules/**/*Entity.{ts,js}',
  MIGRATIONS: 'src/migrations/*.{ts,js}'
};

export default config;
