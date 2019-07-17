CREATE TABLE users(
    username VARCHAR(50)        NOT NULL,
    passwordHash VARCHAR(100)   NOT NULL, 
    firstName VARCHAR(50)       NOT NULL,
    lastName VARCHAR(50)        NOT NULL,
    email VARCHAR(100)          NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (username)
);