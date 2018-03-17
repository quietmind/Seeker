DROP DATABASE IF EXISTS seeker;

CREATE DATABASE seeker;

USE seeker;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE phases (
  id INT NOT NULL AUTO_INCREMENT,
  phase_label VARCHAR(100) NOT NULL
);

CREATE TABLE phase_order (
  user_id INT NOT NULL,
  phase_id INT NOT NULL,
  order_number INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (phase_id) REFERENCES phases(id)
);

CREATE TABLE reminders (
  id INT NOT NULL AUTO_INCREMENT,
  due_date DATE NOT NULL,
  text_desc VARCHAR(1000) NOT NULL
);

CREATE TABLE files (
  id INT NOT NULL AUTO_INCREMENT,
  s3_url VARCHAR(1000)
);

CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  phase_id INT NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  date_applied DATE NOT NULL,
  reminder INT,
  resume_id INT,
  cover_letter_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (phase_id) REFERENCES phases(id),
  FOREIGN KEY (reminder) REFERENCES reminders(id),
  FOREIGN KEY (resume_id) REFERENCES files(id),
  FOREIGN KEY (cover_letter_id) REFERENCES files(id)
);