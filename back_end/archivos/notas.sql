create database linuxtricks;

CREATE USER 'usuarioLector'@'localhost' IDENTIFIED BY 'usuarioLector';
GRANT ALL PRIVILEGES ON linuxtricks. * TO 'usuarioLector'@'localhost';
FLUSH PRIVILEGES;

