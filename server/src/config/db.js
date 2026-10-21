import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
  /* Neon (serverless Postgres) benefits from a small pool and short idle
     timeout so connections are not held open past the platform's idle limit. */
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

/* Test connection on startup */
pool.connect()
  .then(client => {
    console.log('PostgreSQL connected.');
    client.release();
  })
  .catch(err => {
    console.error('PostgreSQL connection error:', err.message);
  });

export default pool;