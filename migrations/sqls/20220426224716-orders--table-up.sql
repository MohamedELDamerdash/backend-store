CREATE TABLE IF NOT EXISTS orders (
  user_id BIGINT REFERENCES users (id),
  status  VARCHAR(50),
  id SERIAL PRIMARY KEY
);