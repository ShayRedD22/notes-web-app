-------------------------------------
-----        Data Base    -----------
-------------------------------------
-- create database database_APP;   --  
-- create database database_links; --
-------------------------------------

use database_links;

--users table
create table users(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table users 
    add primary key (id);

alter table users 
    modify id int(11) not null auto_increment, auto_increment = 2;

describe users;

--admin table
create table admin(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table admin 
    add primary key (id);

alter table admin
    modify id int(11) not null auto_increment, auto_increment = 2;

--links tables
create table links(
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    create_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);


alter table links
    add primary key (id);

alter table links
     modify id int (11) not null auto_increment, auto_increment = 2;

describe links;


--tabla contactos---
create table contact(
    id int(11) not null,
    namecontact varchar(200) not null,
    number varchar (50) not null,
    email varchar(250) not null,
    user_id int (11),
    create_at timestamp not null default current_timestamp,
    constraint fk_user2 foreign key (user_id) references users(id)
);


alter table contact
    add primary key (id);

alter table contact 
     modify id int (11) not null auto_increment, auto_increment = 2;


 
--tabla notas--
create table notes(
    id int(11) not null,
    title varchar(200) not null,
    subtitle varchar(200) not null,
    fecha date not null,
    description text,
    user_id int (11),
    create_at timestamp not null default current_timestamp,
    constraint fk_user3 foreign key (user_id) references users(id)
);

alter table notes
    add primary key (id);

alter table notes
    modify id int (11) not null auto_increment, auto_increment = 2;
