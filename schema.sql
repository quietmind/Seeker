DROP DATABASE IF EXISTS seeker;

CREATE DATABASE seeker;

USE seeker;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  google_id VARCHAR(100) UNIQUE,
  notif_endpoint VARCHAR(1000),
  notif_key VARCHAR(500),
  notif_auth VARCHAR(500),
  access_token VARCHAR(100),
  refresh_token VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE phases (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  phase_order INT NOT NULL,
  phase_label VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE contacts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  contact_email VARCHAR(100),
  contact_phone VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  company VARCHAR(100),
  job_title VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reminders (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  point_of_contact INT,
  due_date DATE NOT NULL,
  text_desc VARCHAR(1000) NOT NULL,
  app_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (point_of_contact) REFERENCES contacts(id)
);

CREATE TABLE files (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  s3_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  phase_id INT NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  date_created DATE NOT NULL,
  last_update DATE NOT NULL,
  reminder_id INT,
  resume_id INT,
  cover_letter_id INT,
  point_of_contact INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (phase_id) REFERENCES phases(id),
  FOREIGN KEY (reminder_id) REFERENCES reminders(id),
  FOREIGN KEY (resume_id) REFERENCES files(id),
  FOREIGN KEY (cover_letter_id) REFERENCES files(id)
);

CREATE TABLE notes (
  id INT NOT NULL AUTO_INCREMENT,
  app_id INT NOT NULL,
  note_text VARCHAR(1000) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (app_id) REFERENCES applications(id)
);