CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  completed boolean,
  created_at TIMESTAMP DEFAULT NOW()
);
