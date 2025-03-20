-- liquibase formatted sql

-- changeset liquibase:1
CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
	role INTEGER REFERENCES roles(id)
);

-- changeset liquibase:2
-- change users username to 50 chars
ALTER TABLE users ALTER COLUMN username TYPE VARCHAR(50);

-- changeset liquibase:3
-- change users username to 100 chars
ALTER TABLE users ALTER COLUMN username TYPE VARCHAR(100);