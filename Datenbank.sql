CREATE DATABASE langlearndb;

USE langlearndb;

CREATE USER 'langlearn_access'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sml12345';
GRANT ALL PRIVILEGES ON langlearndb.* TO 'langlearn_access'@'localhost';

CREATE TABLE users (
ID INT AUTO_INCREMENT,
username VARCHAR(50),
email VARCHAR(100),
creationDate DATETIME,
PRIMARY KEY (ID)
);

INSERT INTO users SET 
`username` = 'Benutzer1', 
`email` = 'benutzer1@awjolanda.ch', 
`creationDate` = '2023-10-18';

CREATE TABLE courses (
ID INT AUTO_INCREMENT,
name VARCHAR(100),
creationDate DATE,
creatorID INT,
PRIMARY KEY (ID),
FOREIGN KEY (creatorID) REFERENCES users(ID)
);

SELECT name FROM courses;