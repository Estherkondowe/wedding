import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
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
