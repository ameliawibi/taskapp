DROP TABLE IF EXISTS task_labels CASCADE;
DROP TABLE IF EXISTS labels CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_statuses CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  avatar TEXT,
  name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT,
  message VARCHAR,
  CONSTRAINT fk_senderid_id
  FOREIGN KEY (sender_id)
  REFERENCES users(id)
  ON DELETE CASCADE
);

CREATE TABLE task_statuses (
  id SERIAL PRIMARY KEY,
  status TEXT
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  due_date TEXT,
  name TEXT,
  description TEXT,
  assigned_to INTEGER,
  task_status_id INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_tasks_status_id
  FOREIGN KEY (task_status_id)
  REFERENCES task_statuses(id)
  ON DELETE CASCADE
  ,
  CONSTRAINT fk_tasks_user_id
  FOREIGN KEY (assigned_to)
  REFERENCES users(id)
  ON DELETE CASCADE
  );

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  task_id INTEGER,
  user_id INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_comments_task_id
  FOREIGN KEY (task_id)
  REFERENCES tasks(id)
  ON DELETE CASCADE
  ,
  CONSTRAINT fk_comments_user_id
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE CASCADE
  );

  CREATE TABLE labels (
  id SERIAL PRIMARY KEY,
  label TEXT
);

CREATE TABLE task_labels (
  id SERIAL PRIMARY KEY,
  task_id INTEGER,
  label_id INTEGER,
  FOREIGN KEY (task_id)
  REFERENCES tasks(id)
  ON DELETE CASCADE,
  CONSTRAINT fk_tasklabel_label_id
  FOREIGN KEY (label_id)
  REFERENCES labels(id)
  ON DELETE CASCADE
);