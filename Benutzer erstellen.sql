CREATE USER 'langlearn_access'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sml12345';
GRANT ALL PRIVILEGES ON langlearndb.* TO 'langlearn_access'@'localhost';