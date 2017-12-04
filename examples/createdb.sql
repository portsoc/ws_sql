create database if not exists ws_sql_example;

create table if not exists ws_sql_example.Contact (
  id int primary key auto_increment,
  fname varchar(30),
  lname varchar(30),
  phone varchar(15),
  address varchar(150)
);
